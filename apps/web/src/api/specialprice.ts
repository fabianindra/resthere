import axios from 'axios';

export function getDetailSpecialPrice(id: string) {
  return axios.get(`http://localhost:6570/api/specialprice/${id}`);
}

export function getSpecialPriceByRoom(room_id: string) {
  return axios.get(`http://localhost:6570/api/specialprice/${room_id}`);
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
  axios.post(`http://localhost:6570/api/specialprice`, {
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
  axios.put(`http://localhost:6570/api/specialprice`, {
    specialprice_id,
    start_date,
    end_date,
    special_price,
  });
}

export function deleteSpecialPrice(specialprice_id: string) {
  axios.delete(`http://localhost:6570/api/specialprice/${specialprice_id}`);
}
