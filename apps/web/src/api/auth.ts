import axios from 'axios';
import { apiUrl } from './index';

export function Login() {
  return axios.get(`${apiUrl}/auth/login`);
}

export function RegisterUser() {
  return axios.get(`${apiUrl}/auth/register-user`);
}

export function RegisterTenant() {
  return axios.get(`${apiUrl}/auth/register-tenant`);
}
