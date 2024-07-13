import Cookies from 'js-cookie';
import axios from 'axios';
import { apiUrl } from '@/api';

export const verifyTokenClient = async () => {
  const tokenToVerify = Cookies.get('token');

  try {
    if (!tokenToVerify) {
      return false;
    }

    const response = await axios.post(
      `${apiUrl}/auth/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
        },
      },
    );

    return response.status == 200;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
