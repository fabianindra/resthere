import { useState } from 'react';
import { getReview } from '@/api/review';

const useGetReviews = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (propertyId: number) => {
    setLoading(true);
    try {
      const response = await getReview(propertyId);
      console.log(response.data.data);
      setReviews(response.data.data);
    } catch (err) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  return { fetchReviews, reviews, loading, error };
};

export default useGetReviews;
