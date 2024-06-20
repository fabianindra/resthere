import axios from 'axios';

export function getProfileUser(user_id: number) {
  return axios.get(`http://localhost:6570/api/profile/${user_id}`);
}

export function updateDataProfile(
  user_id: number,
  email: string,
  username: string,
  gender: 'male' | `female`,
  brithday: string,
  file: any,
) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('username', username);
  formData.append('gender', gender);
  formData.append('brithday', brithday);
  formData.append('file', file);
  return axios.put(`http://localhost:6570/api/profile/${user_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
}
