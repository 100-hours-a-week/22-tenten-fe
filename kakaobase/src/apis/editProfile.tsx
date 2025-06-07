import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export async function editProfile({ imageUrl }: { imageUrl: string }) {
  const accessToken = getClientCookie('accessToken');
  try {
    await api.put(
      '/users/images',
      {
        image_url: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

export async function editGithub({ url }: { url: string }) {
  const accessToken = getClientCookie('accessToken');
  try {
    await api.put(
      '/users/github-url',
      {
        github_url: url,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
