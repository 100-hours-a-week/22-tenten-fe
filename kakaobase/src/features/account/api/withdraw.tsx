import api from '@/lib/api';

export default async function withdraw() {
  try {
    await api.delete('/users');
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
