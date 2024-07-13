import axios from 'axios';
import { apiUrl } from './index';

export function getDataPropertyByRoom(
  page: number,
  city?: string,
  search?: string,

  startDate?: string | undefined,
  endDate?: string | undefined,
) {
  const params = new URLSearchParams();
  params.append('page', page.toString());

  if (city) params.append('city', city);
  if (search) params.append('search', search);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return axios.get(`${apiUrl}/property/?${params.toString()}`);
}

export function getDataPropertyByTenant(
  tenant_id: number,
  page: number,
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
  startDate: string,
  endDate: string,
) {
  return axios.get(
    `${apiUrl}/property/${tenant_id}?page=${page}&search=${search}&category=${category}&sortBy=${sortBy}&sortDirection=${sortDirection}&startDate=${startDate}&endDate=${endDate}`,
  );
}

export function getDetailProperty(id: any) {
  return axios.get(`${apiUrl}/property/detail/${id}`);
}

export function addDataProperty(
  name: string,
  address: string,
  category_property: string,
  city_name: string,
  province_name: string,
  tenant_id: string,
  file: any,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('category_property', category_property);
  formData.append('city_name', city_name);
  formData.append('province_name', province_name);
  formData.append('tenant_id', tenant_id);
  formData.append('file', file);
  return axios.post(`${apiUrl}/property/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}
export function editDataProperty(
  name: string,
  address: string,
  category_property: string,
  city_name: string,
  province_name: string,
  property_id: string,
  file: any,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('category_property', category_property);
  formData.append('city_name', city_name);
  formData.append('province_name', province_name);
  formData.append('file', file);
  return axios.put(`${apiUrl}/property/${property_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}

export function deleteProperty(id: any) {
  return axios.delete(`${apiUrl}/property/${id}`);
}
