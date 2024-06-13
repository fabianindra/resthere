import { useState } from 'react';
import { getDetailProperty } from '@/api/property';
import { getDetailRoom } from '@/api/rooms';

const useDetailRoom = () => {
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetailRoom(id);
      setRoom(response.data.data);
    } catch (err) {
      setError('Failed to fetch property details');
    } finally {
      setLoading(false);
    }
  };

  return { room, loading, error, fetchRoom };
};

export default useDetailRoom;
