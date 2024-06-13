import { useState } from 'react';
import { getDataCity } from '@/api/content';
import { City } from '@/types';

const useCities = () => {
  const [cities, setCities] = useState<Record<number, City[]>>({});
  const [city, setCity] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async (provinceId: number) => {
    setLoading(true);
    try {
      const response = await getDataCity(provinceId);
      setCities((prevState) => ({
        ...prevState,
        [provinceId]: response.data,
      }));
      setCity([...response.data]);
    } catch (err) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  return { cities, city, fetchCities, loading, error };
};

export default useCities;
