import { useState } from 'react';
import { getDetailProperty } from '@/api/property';

const usePropertyDetail = () => {
  const [property, setProperty] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async (id: number) => {
    setLoading(true);
    try {
      const response = await getDetailProperty(id);
      setProperty(response.data.data);
    } catch (err) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  return { property, fetchProperty, loading, error };
};

export default usePropertyDetail;
