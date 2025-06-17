import api from '../lib/api';

export default async function changePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await api.put('users/password', {
      email,
      new_password: password,
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
