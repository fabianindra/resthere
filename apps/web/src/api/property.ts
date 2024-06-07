import axios from 'axios';

export function getDataRoom() {
  return axios.get(`http://localhost:6570/api/property/`);
}
