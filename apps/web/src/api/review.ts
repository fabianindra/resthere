import axios from 'axios';
import { apiUrl } from './index';

export function addReview(
  property_id: number,
  star: number,
  feed_back: string,
) {
  return axios.post(`${apiUrl}/review`, {
    property_id,
    star,
    feed_back,
  });
}

export function getReview(property_id: number) {
  return axios.get(`${apiUrl}/review/${property_id}`);
}
