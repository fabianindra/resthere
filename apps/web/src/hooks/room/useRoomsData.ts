import { useState, useEffect } from 'react';
import { getDataRoomsByProperty } from '@/api/rooms';

const useRoomsData = (
  propertyId: number,
  page: number,
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
) => {
  const [rooms, setRooms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDataRoomsByProperty(
        propertyId,
        page,
        search,
        category,
        sortBy,
        sortDirection,
      );
      setRooms(response.data.data);
    } catch (err) {
      setError('Failed to fetch rooms data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [propertyId, page, search, category, sortBy, sortDirection]);

  return { rooms, loading, error, fetchRooms };
};

export default useRoomsData;
