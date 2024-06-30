import axios from 'axios';

export function getDetailAvailableRoom(id: string) {
  return axios.get(`http://localhost:6570/api/romm-availability/${id}`);
}

export function getAvailableRoomByRoom(room_id: string) {
  return axios.get(`http://localhost:6570/api/romm-availability/${room_id}`);
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
  axios.post(`http://localhost:6570/api/romm-availability`, {
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
  //console.log();
  axios.put(`http://localhost:6570/api/romm-availability`, {
    roomavailability_id,
    start_date,
    end_date,
  });
}

export function deleteAvailableRoom(roomavailability_id: string) {
  axios.delete(
    `http://localhost:6570/api/romm-availability/${roomavailability_id}`,
  );
}
