import { useSignupStore } from '@/features/auth/stores/signupStore';
import useRoutings from '@/shared/hooks/useRoutings';

export default function useSignupStep1() {
  const { isVerified, setSignupStep1Info } = useSignupStore();
  const { goSignupStep2 } = useRoutings();

  const onSubmitStep1 = (password: string) => {
    setSignupStep1Info({ password: password });
    goSignupStep2();
  };

  return {
    isVerified,
    onSubmitStep1,
  };
}
