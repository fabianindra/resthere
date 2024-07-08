import { useState, useEffect } from 'react';
import { getDataPropertyByRoom } from '@/api/property';
import { City } from '@phosphor-icons/react';

const usePropertyAll = () => {
  const [dataRoom, setDataRoom] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setDirection] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await getDataPropertyByRoom(
        page,
        city,
        search,
        sortBy,
        sortDirection,
        startDate,
        endDate,
      );
      setMaxPage(Math.ceil(response.data.count / 4));
      setDataRoom(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortDirection, sortBy, search, City]);

  const handleDirections = () => {
    setDirection((prev) => (prev == 'asc' ? 'desc' : 'asc'));
  };

  return {
    dataRoom,
    page,
    setPage,
    maxPage,
    search,
    setSearch,
    city,
    setCity,
    sortBy,
    setSortBy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortDirection,
    handleDirections,
  };
};

export default usePropertyAll;
