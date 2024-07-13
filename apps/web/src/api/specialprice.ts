import axios from 'axios';
import { apiUrl } from './index';

export function getDetailSpecialPrice(id: string) {
  return axios.get(`${apiUrl}/specialprice/${id}`);
}

export function getSpecialPriceByRoom(room_id: string) {
  return axios.get(`${apiUrl}/specialprice/${room_id}`);
}

export function addSpecialPrice({
  room_id,
  start_date,
  end_date,
  special_price,
}: {
  room_id: string;
  start_date: Date;
  end_date: Date;
  special_price: number;
}) {
  axios.post(`${apiUrl}/specialprice`, {
    room_id,
    start_date,
    end_date,
    special_price,
  });
}

export function editSpecialPrice({
  specialprice_id,
  start_date,
  end_date,
  special_price,
}: {
  specialprice_id: string;
  start_date: string;
  end_date: string;
  special_price: number;
}) {
  axios.put(`${apiUrl}/specialprice`, {
    specialprice_id,
    start_date,
    end_date,
    special_price,
  });
}

export function deleteSpecialPrice(specialprice_id: string) {
  axios.delete(`${apiUrl}/specialprice/${specialprice_id}`);
}
