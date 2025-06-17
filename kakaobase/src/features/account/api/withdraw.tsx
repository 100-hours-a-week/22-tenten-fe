import api from '@/shared/api/api';

export default async function withdraw() {
  try {
    await api.delete('/users');
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
