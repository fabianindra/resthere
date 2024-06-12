import axios from "axios";

export function Login() {
    return axios.get(`http://localhost:6570/api/auth/login`);
  }

export function RegisterUser() {
    return axios.get(`http://localhost:6570/api/auth/register-user`);
  }

export function RegisterTenant() {
    return axios.get(`http://localhost:6570/api/auth/register-tenant`);
  }