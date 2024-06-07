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
