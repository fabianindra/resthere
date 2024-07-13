import axios from 'axios';
import { apiUrl } from './index';

export function getProfileUser(user_id: number) {
  return axios.get(`${apiUrl}/profile/${user_id}`);
}

export function updateFotoProfile(user_id: number, file: any) {
  const formData = new FormData();
  formData.append('file', file);

  return axios.put(`${apiUrl}/profile/foto/${user_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}

export function updateDataProfile(
  user_id: number,
  email: string,
  username: string,
  gender: 'male' | `female`,
  brithday: string,
) {
  return axios.put(`${apiUrl}/profile/${user_id}`, {
    email,
    username,
    gender,
    brithday,
  });
}
