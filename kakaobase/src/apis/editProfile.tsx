import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export default async function editProfile({ imageUrl }: { imageUrl: string }) {
  const accessToken = getClientCookie('accessToken');
  try {
    const response = await api.put('/users/images', {
      image_url: imageUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
