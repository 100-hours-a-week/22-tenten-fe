import signup from '@/features/auth/api/signup';
import { useToast } from '@/shared/hooks/ToastContext';
import { courseMap } from '@/shared/lib/courseMap';
import { signupStep2Schema } from '@/features/auth/schemas/signupStep2Schema';
import { useSignupStore } from '@/features/auth/stores/signupStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import useRoutings from '@/shared/hooks/useRoutings';

export type SignupStep2Data = z.infer<typeof signupStep2Schema>;

export default function useSignupForm() {
  const { goLogin } = useRoutings();
  const { email, password, clear } = useSignupStore();
  const { showToast } = useToast();

  useEffect(() => {
    return () => clear();
  }, []);

  const methods = useForm<SignupStep2Data>({
    resolver: zodResolver(signupStep2Schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      course: '' as unknown as SignupStep2Data['course'],
      githubUrl: '',
    },
  });

  const onSubmitStep2 = async (data: SignupStep2Data) => {
    try {
      if (email === '' || password === '' || !data) return;
      const request = {
        email: email,
        password: password,
        name: data.name,
        nickname: data.nickname,
        class_name: courseMap[data.course],
        github_url: data.githubUrl,
      };

      await signup(request);

      showToast('회원 가입 성공! ✌️');
      goLogin();
    } catch (e: any) {
      showToast('회원 가입 실패! 잠시 후 다시 시도해 주세요. 😭');
    }
  };

  return { ...methods, onSubmitStep2, email, password };
}
