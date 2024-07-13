import axios from 'axios';
import { apiUrl } from './index';

export function cancelTransaction(bookingId: string) {
  return axios.post(`${apiUrl}/transaction/update-status`, {
    transactionId: bookingId,
    status: 'cancelled',
  });
}

export function rejectTransaction(bookingId: string) {
  return axios.post(`${apiUrl}/transaction/update-status`, {
    transactionId: bookingId,
    status: 'waiting payment',
  });
}

export function approveTransaction(
  bookingId: string,
  email: string,
  text: string,
) {
  return axios.post(`${apiUrl}/transaction/approve`, {
    transactionId: bookingId,
    email: email,
    text: text,
  });
}
