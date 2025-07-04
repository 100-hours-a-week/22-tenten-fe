import api from '@/shared/api/api';

interface EmailVerification {
  email: string;
  purpose: 'sign-up' | 'password-change' | 'unregister';
}

export default async function sendEmail({ email, purpose }: EmailVerification) {
  try {
    await api.post('/users/email/verification-requests', {
      email,
      purpose,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
