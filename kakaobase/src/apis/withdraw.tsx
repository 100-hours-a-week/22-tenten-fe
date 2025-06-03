import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export default async function withdraw() {
  try {
    const response = await api.delete('/users', {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    console.log(response);
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
