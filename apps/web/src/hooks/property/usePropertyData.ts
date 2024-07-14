import { useState, useEffect } from 'react';
import { getDataPropertyByTenant } from '@/api/property';
import Cookies from 'js-cookie';

const usePropertyData = () => {
  const [dataRoom, setDataRoom] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setDirection] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tenantId, setTenantId] = useState<any>();

  useEffect(() => {
    const storedUser = Cookies.get('user');

    if (storedUser) {
      try {
        const dataUser = JSON.parse(storedUser);

        if (dataUser && dataUser.id) {
          setTenantId(dataUser.id);
        }
      } catch (e) {
        console.error("Failed to parse 'user' cookie:", e);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      if (tenantId) {
        const response = await getDataPropertyByTenant(
          tenantId,
          page,
          search,
          category,
          sortBy,
          sortDirection,
          startDate,
          endDate,
        );
        setMaxPage(Math.ceil(response.data.count / 4));
        setDataRoom(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [
    page,
    sortDirection,
    sortBy,
    search,
    category,
    startDate,
    endDate,
    tenantId,
  ]);

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
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortDirection,
    handleDirections,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchData,
  };
};

export default usePropertyData;
