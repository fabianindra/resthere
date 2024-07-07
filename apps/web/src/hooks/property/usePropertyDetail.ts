import { useEffect, useState, useCallback } from 'react';
import { getDetailProperty } from '@/api/property';

const usePropertyDetails = (propertyId: any) => {
  const [property, setProperty] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProperty = useCallback(async (id: any) => {
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
  }, []);

  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
    }
  }, [propertyId, fetchProperty]);

  return { property, loading, error };
};

export default usePropertyDetails;
