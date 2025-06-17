import api from '@/shared/lib/api';

export async function editProfile({ imageUrl }: { imageUrl: string }) {
  try {
    await api.put('/users/images', {
      image_url: imageUrl,
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

export async function editGithub({ url }: { url: string }) {
  try {
    await api.put('/users/github-url', {
      github_url: url,
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
