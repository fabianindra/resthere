import axios from 'axios';

export function cancelTransaction(bookingId: string) {
  return axios.post('http://localhost:6570/api/transaction/update-status', {
    transactionId: bookingId,
    status: 'cancelled',
  });
}
