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
) {
  return axios.put(`http://localhost:6570/api/profile/${user_id}`, {
    email,
    username,
    gender,
    brithday,
  });
}
