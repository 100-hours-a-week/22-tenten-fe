import { z } from 'zod';
import { loginSchema } from '@/schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { login } from '@/apis/login';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/app/ToastContext';

type LoginFormData = z.infer<typeof loginSchema>;

export default function useLoginForm() {
  const router = useRouter();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const { showToast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { setError } = loginForm;

  const onSubmit = async (data: LoginFormData, autoLogin: boolean) => {
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await login(requestBody);
      document.cookie = `accessToken=${response.data.access_token}; path=/; secure; samesite=lax; max-age=1800`; //30분
      localStorage.setItem('myCourse', response.data.class_name);

      setUserInfo({
        course: response.data.class_name,
        nickname: response.data.nickname,
        userId: Number(response.data.member_id),
        autoLogin: autoLogin,
      });
      router.push('/');
    } catch (e: any) {
      const errorCode = e?.response?.data?.error;
      if (errorCode === 'invalid_password') {
        setError('password', {
          type: 'manual',
          message: '이메일 또는 비밀번호를 확인해 주세요.',
        });
      } else if (errorCode === 'resource_not_found') {
        setError('email', { message: '가입되지 않은 이메일입니다.' });
      } else {
        showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
      }
    }
  };

  return {
    ...loginForm,
    onSubmit,
    goToSignup: () => {
      router.push('/signup/step1');
    },
  };
}
