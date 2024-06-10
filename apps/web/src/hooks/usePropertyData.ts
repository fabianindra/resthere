import { useState, useEffect } from 'react';
import { getDataPropertyByTenant } from '@/api/property';

const usePropertyData = () => {
  const [dataRoom, setDataRoom] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setDirection] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await getDataPropertyByTenant(
        1,
        page,
        search,
        category,
        sortBy,
        sortDirection,
      );
      setMaxPage(Math.ceil(response.data.count / 4));
      setDataRoom(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortDirection, sortBy, search]);

  const handleDirections = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return {
    dataRoom,
    page,
    setPage,
    maxPage,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortDirection,
    handleDirections,
  };
};

export default usePropertyData;
