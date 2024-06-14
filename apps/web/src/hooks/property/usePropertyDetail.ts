import { useEffect, useState } from 'react';
import { getDetailProperty } from '@/api/property';

const usePropertyDetails = () => {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetailProperty(id);
      setProperty(response.data.data);
    } catch (err) {
      setError('Failed to fetch property details');
    } finally {
      setLoading(false);
    }
  };

  return { property, loading, error, fetchProperty };
};

export default usePropertyDetails;
