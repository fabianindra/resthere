import { useState, useEffect } from 'react';
import { getDataProvinces } from '@/api/content';
import { Province } from '@/types';

const useProvinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getDataProvinces();
        setProvinces(response.data);
      } catch (err) {
        setError('Failed to fetch provinces');
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { provinces, loading, error };
};

export default useProvinces;
