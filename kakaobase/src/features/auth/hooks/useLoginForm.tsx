import { z } from 'zod';
import { loginSchema } from '@/features/auth/schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/features/auth/api/login';
import { useUserStore } from '@/entities/users/stores/userStore';
import { useToast } from '@/shared/hooks/ToastContext';
import useRoutings from '@/shared/hooks/useRoutings';

type LoginFormData = z.infer<typeof loginSchema>;

export default function useLoginForm() {
  const { setUserInfo } = useUserStore();
  const { showToast } = useToast();
  const { goHome } = useRoutings();

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

  const onSubmit = async (data: LoginFormData) => {
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await login(requestBody);

      setUserInfo({
        course: response.data.class_name,
        selectedCourse: response.data.class_name,
        nickname: response.data.nickname,
        userId: Number(response.data.member_id),
        imageUrl: response.data.image_url,
      });
      goHome();
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
  };
}
