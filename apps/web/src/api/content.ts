import axios from 'axios';

export function getDataProvinces() {
  return axios.get(
    `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`,
  );
}

export function getDataCity(id_provinces: number) {
  return axios.get(
    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id_provinces}.json`,
  );
}
