import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LibraryContext = createContext(null);

const STORAGE_KEY = 'katalog_library';

const loadInitial = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // localStorage corrompido — ignora e usa o padrão
  }
  return { favorites: [], watchlist: [], ratings: {}, statuses: {} };
};

export const LibraryProvider = ({ children }) => {
  const [library, setLibrary] = useState(loadInitial);

  // Persiste a cada mudança
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  const toggleFavorite = useCallback((itemId) => {
    setLibrary((prev) => {
      const isFav = prev.favorites.includes(itemId);
      return {
        ...prev,
        favorites: isFav
          ? prev.favorites.filter((id) => id !== itemId)
          : [...prev.favorites, itemId],
      };
    });
  }, []);

  const toggleWatchlist = useCallback((itemId) => {
    setLibrary((prev) => {
      const inList = prev.watchlist.includes(itemId);
      return {
        ...prev,
        watchlist: inList
          ? prev.watchlist.filter((id) => id !== itemId)
          : [...prev.watchlist, itemId],
      };
    });
  }, []);

  const setRating = useCallback((itemId, rating) => {
    setLibrary((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [itemId]: rating },
    }));
  }, []);

  const setStatus = useCallback((itemId, status) => {
    setLibrary((prev) => ({
      ...prev,
      statuses: { ...prev.statuses, [itemId]: status },
    }));
  }, []);

  const isFavorite = useCallback((itemId) => library.favorites.includes(itemId), [library.favorites]);
  const isInWatchlist = useCallback((itemId) => library.watchlist.includes(itemId), [library.watchlist]);
  const getRating = useCallback((itemId) => library.ratings[itemId], [library.ratings]);
  const getStatus = useCallback((itemId, fallback) => library.statuses[itemId] || fallback, [library.statuses]);

  return (
    <LibraryContext.Provider value={{
      library,
      toggleFavorite,
      toggleWatchlist,
      setRating,
      setStatus,
      isFavorite,
      isInWatchlist,
      getRating,
      getStatus,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary deve ser usado dentro de LibraryProvider');
  return ctx;
};

export default LibraryContext;
