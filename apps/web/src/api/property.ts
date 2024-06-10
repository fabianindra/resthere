import axios from 'axios';

export function getDataPropertyByRoom(
  page: number,
  city?: string,
  search?: string,
) {
  return axios.get(
    `http://localhost:6570/api/property/?page=${page}&city=${city ? city : ''}&search=${search ? search : ''}`,
  );
}

export function getDataPropertyByTenant(
  tenant_id: number,
  page: number,
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
) {
  return axios.get(
    `http://localhost:6570/api/property/${tenant_id}?page=${page}&search=${search}&category=${category}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
  );
}
