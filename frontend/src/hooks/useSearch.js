import { useState, useMemo } from 'react';

/**
 * Hook para busca e filtro local sobre uma lista de itens.
 *
 * @param {Array}  items       - Lista original
 * @param {Array}  searchKeys  - Campos do objeto para buscar (ex: ['title', 'description'])
 */
const useSearch = (items = [], searchKeys = ['title']) => {
  const [query, setQuery] = useState('');
  const [activeGenres, setActiveGenres] = useState([]);

  const filtered = useMemo(() => {
    let result = items;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => String(item[key] || '').toLowerCase().includes(q))
      );
    }

    if (activeGenres.length > 0) {
      result = result.filter((item) =>
        activeGenres.some((genre) =>
          String(item.genres || item.genre || '').toLowerCase().includes(genre.toLowerCase())
        )
      );
    }

    return result;
  }, [items, query, activeGenres, searchKeys]);

  const handleFilter = (genre, checked) => {
    setActiveGenres((prev) =>
      checked ? [...prev, genre] : prev.filter((g) => g !== genre)
    );
  };

  return { filtered, query, setQuery, activeGenres, handleFilter };
};

export default useSearch;
