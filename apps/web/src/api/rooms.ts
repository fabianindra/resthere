import axios from 'axios';

export function getDataRoomsByProperty(
  property_id: number,
  page: number,
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
) {
  return axios.get(
    `http://localhost:6570/api/room/${property_id}?page=${page}&search=${search}&category=${category}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
  );
}
