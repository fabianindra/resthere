import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/store';
import {
  fetchProperties,
  setPage,
  setSearch,
  setCity,
  setStartDate,
  setEndDate,
} from '../../lib/fratures/propertySlice';

const usePropertyAll = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataProperty, page, maxPage, search, city, startDate, endDate } =
    useSelector((state: RootState) => state.property);

  useEffect(() => {
    dispatch(
      fetchProperties({
        page,
        city,
        search,
        startDate,
        endDate,
      }),
    );
  }, [dispatch, page, search, city, startDate, endDate]);

  return {
    dataProperty,
    page,
    setPage: (value: number) => dispatch(setPage(value)),
    maxPage,
    search,
    setSearch: (value: string) => dispatch(setSearch(value)),
    city,
    setCity: (value: string) => dispatch(setCity(value)),
    startDate,
    setStartDate: (value: string) => dispatch(setStartDate(value)),
    endDate,
    setEndDate: (value: string) => dispatch(setEndDate(value)),
  };
};

export default usePropertyAll;
