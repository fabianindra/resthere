import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/store';
import {
  fetchProperties,
  setPage,
  setSearch,
  setCity,
  setSortBy,
  setStartDate,
  setEndDate,
  toggleSortDirection,
} from '../../lib/fratures/propertySlice';

const usePropertyAll = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    dataProperty,
    page,
    maxPage,
    search,
    city,
    startDate,
    endDate,
    sortBy,
    sortDirection,
  } = useSelector((state: RootState) => state.property);

  useEffect(() => {
    dispatch(
      fetchProperties({
        page,
        city,
        search,
        sortBy,
        sortDirection,
        startDate,
        endDate,
      }),
    );
  }, [dispatch, page, sortDirection, sortBy, search, city, startDate, endDate]);

  const handleDirections = () => {
    dispatch(toggleSortDirection());
  };

  return {
    dataProperty,
    page,
    setPage: (value: number) => dispatch(setPage(value)),
    maxPage,
    search,
    setSearch: (value: string) => dispatch(setSearch(value)),
    city,
    setCity: (value: string) => dispatch(setCity(value)),
    sortBy,
    setSortBy: (value: string) => dispatch(setSortBy(value)),
    startDate,
    setStartDate: (value: string) => dispatch(setStartDate(value)),
    endDate,
    setEndDate: (value: string) => dispatch(setEndDate(value)),
    sortDirection,
    handleDirections,
  };
};

export default usePropertyAll;
