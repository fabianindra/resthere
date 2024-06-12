import { useState, useEffect } from 'react';
import { getDetailProperty } from '@/api/property';
import { getDataRoomsByProperty } from '@/api/rooms';

const usePropertyDetail = () => {
  const [property, setProperty] = useState<any>(null);
  const [rooms, setRooms] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('asc');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetailProperty(id);
      const roomsResponse = await getDataRoomsByProperty(
        id,
        page,
        search,
        category,
        sortBy,
        sortDirection,
      );
      setProperty(response.data.data);
      setRooms(roomsResponse.data.data);
    } catch (err) {
      setError('Failed to fetch property details or rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleDirections = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (property) {
      fetchProperty(property.id);
    }
  }, [page, search, category, sortBy, sortDirection]);

  return {
    property,
    rooms,
    page,
    setPage,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    loading,
    error,
    fetchProperty,
    handleDirections,
  };
};

export default usePropertyDetail;
