import axios from 'axios';

export function cancelTransaction(bookingId: string) {
  return axios.post('http://localhost:6570/api/transaction/update-status', {
    transactionId: bookingId,
    status: 'cancelled',
  });
}

export function rejectTransaction(bookingId: string) {
  return axios.post('http://localhost:6570/api/transaction/update-status', {
    transactionId: bookingId,
    status: 'waiting payment',
  });
}

export function approveTransaction(
  bookingId: string,
  email: string,
  text: string,
) {
  return axios.post('http://localhost:6570/api/transaction/approve', {
    transactionId: bookingId,
    email: email,
    text: text,
  });
}
