import { useState } from 'react';
import { getDetailRoom } from '@/api/rooms';

const useDetailRoom = () => {
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchRoom = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetailRoom(
        id,
        startDate?.toISOString() ?? '',
        endDate?.toISOString() ?? '',
      );
      setRoom(response.data.data);
    } catch (err) {
      setError('Failed to fetch room details');
    } finally {
      setLoading(false);
    }
  };

  return {
    room,
    loading,
    error,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchRoom,
  };
};

export default useDetailRoom;
