import axios from 'axios';

export function getDetailRoom(room_id: number) {
  return axios.get(`http://localhost:6570/api/room/detail/${room_id}`);
}

export function getDataRoomsByProperty(
  property_id: number,
  page: number,
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
  startDate: string,
  endDate: string,
) {
  return axios.get(
    `http://localhost:6570/api/room/${property_id}?page=${page}&search=${search}&category=${category}&sortBy=${sortBy}&sortDirection=${sortDirection}&startDate=${startDate}&endDate=${endDate}`,
  );
}

export function editDataRoom(
  name: string,
  price: string,
  weekend_price: string,
  capacity_person: string,
  capacity_room: string,
  room_size: string,
  room_id: string,
  file: any,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('weekend_price', weekend_price);
  formData.append('capacity_person', capacity_person);
  formData.append('capacity_room', capacity_room);
  formData.append('room_size', room_size);
  formData.append('file', file);
  return axios.put(`http://localhost:6570/api/room/${room_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}
export function addDataRoom(
  name: string,
  price: string,
  weekend_price: string,
  capacity_person: string,
  capacity_room: string,
  room_size: string,
  property_id: string,
  file: any,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('weekend_price', weekend_price);
  formData.append('capacity_person', capacity_person);
  formData.append('capacity_room', capacity_room);
  formData.append('room_size', room_size);
  formData.append('property_id', property_id);
  formData.append('file', file);
  return axios.post(`http://localhost:6570/api/room/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}

export function getDeleteRoom(room_id: number) {
  return axios.delete(`http://localhost:6570/api/room/${room_id}`);
}
