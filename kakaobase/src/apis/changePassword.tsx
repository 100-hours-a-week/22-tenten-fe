import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export default async function changePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await api.put(
      'users/password',
      { email, new_password: password },
      {
        headers: {
          Authorization: `Bearer ${getClientCookie('accessToken')}`,
        },
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
