import axios from 'axios';

export function getDataPropertyByRoom(
  page: number,
  city?: string,
  search?: string,
  sortBy?: string,
  sortDirection?: string,
) {
  const params = new URLSearchParams();
  params.append('page', page.toString());

  if (city) params.append('city', city);
  if (search) params.append('search', search);
  if (sortBy) params.append('sortBy', sortBy);
  if (sortDirection) params.append('sortDirection', sortDirection);

  return axios.get(`http://localhost:6570/api/property/?${params.toString()}`);
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

export function getDetailProperty(id: any) {
  return axios.get(`http://localhost:6570/api/property/detail/${id}`);
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
  return axios.post(`http://localhost:6570/api/property/`, formData, {
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
  return axios.put(
    `http://localhost:6570/api/property/${property_id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: '',
      },
    },
  );
}

export function deleteProperty(id: any) {
  return axios.delete(`http://localhost:6570/api/property/${id}`);
}
