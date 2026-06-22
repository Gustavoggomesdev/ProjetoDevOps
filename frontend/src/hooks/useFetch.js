import { useState, useEffect, useCallback } from 'react';
import { mockItems } from '../data/mockData';

const MOCK_ENABLED = process.env.REACT_APP_MOCK_AUTH === 'true';

// Retorna dados mock filtrados por tipo quando o backend não está rodando
const getMockData = (fetchFn) => {
  const str = fetchFn.toString();
  if (str.includes('movies')) return mockItems.filter(i => i.type === 'movie');
  if (str.includes('series')) return mockItems.filter(i => i.type === 'series');
  if (str.includes('games'))  return mockItems.filter(i => i.type === 'game');
  // Home — retorna tudo
  return mockItems;
};

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (MOCK_ENABLED) {
      // Simula um pequeno delay de rede
      await new Promise(r => setTimeout(r, 400));
      setData(getMockData(fetchFn));
      setLoading(false);
      return;
    }

    try {
      const response = await fetchFn();
      setData(response.data);
    } catch (err) {
      if (!err.response) {
        // Rede offline: usa mock automaticamente como fallback
        setData(getMockData(fetchFn));
      } else {
        setError(err.response?.data?.detail || err.message || 'Erro ao carregar dados.');
      }
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { execute(); }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
