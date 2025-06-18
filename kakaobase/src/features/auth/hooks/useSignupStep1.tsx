import { useSignupStore } from '@/features/auth/stores/signupStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useSignupStep1() {
  const { isVerified, setSignupStep1Info, clear } = useSignupStore();
  const router = useRouter();

  useEffect(() => {
    clear();
  }, []);

  const onSubmitStep1 = (password: string) => {
    setSignupStep1Info({ password: password });
    router.push('/signup/step2');
  };

  return {
    isVerified,
    onSubmitStep1,
  };
}
