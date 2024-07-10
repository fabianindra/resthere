import axios from 'axios';

export function addReview(
  property_id: number,
  star: number,
  feed_back: string,
) {
  return axios.post(`http://localhost:6570/api/review`, {
    property_id,
    star,
    feed_back,
  });
}

export function getReview(property_id: number) {
  return axios.get(`http://localhost:6570/api/review/${property_id}`);
}
