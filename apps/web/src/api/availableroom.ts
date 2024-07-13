import axios from 'axios';
import { apiUrl } from './index';

export function getDetailAvailableRoom(id: string) {
  return axios.get(`${apiUrl}/romm-availability/${id}`);
}

export function getAvailableRoomByRoom(room_id: string) {
  return axios.get(`${apiUrl}/romm-availability/${room_id}`);
}

export function addAvailableRoom({
  room_id,
  start_date,
  end_date,
}: {
  room_id: string;
  start_date: Date;
  end_date: Date;
}) {
  axios.post(`${apiUrl}/romm-availability`, {
    room_id,
    start_date,
    end_date,
  });
}

export function editAvailableRoom({
  roomavailability_id,
  start_date,
  end_date,
}: {
  roomavailability_id: string;
  start_date: string;
  end_date: string;
}) {
  axios.put(`${apiUrl}/romm-availability`, {
    roomavailability_id,
    start_date,
    end_date,
  });
}

export function deleteAvailableRoom(roomavailability_id: string) {
  axios.delete(`${apiUrl}/romm-availability/${roomavailability_id}`);
}
