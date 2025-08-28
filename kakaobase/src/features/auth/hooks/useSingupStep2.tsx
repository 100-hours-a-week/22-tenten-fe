import signup from '@/features/auth/api/signup';
import { useToast } from '@/shared/hooks/ToastContext';
import { courseMap } from '@/shared/lib/courseMap';
import {
  Course,
  signupStep2Schema,
} from '@/features/auth/schemas/signupStep2Schema';
import { useSignupStore } from '@/features/auth/stores/signupStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRoutings from '@/shared/hooks/useRoutings';

export type SignupStep2Data = {
  name: string;
  nickname: string;
  course: Course;
  githubUrl: string;
};

export default function useSignupForm() {
  const { goLogin } = useRoutings();
  const { email, password, clear } = useSignupStore();
  const { showToast } = useToast();

  const methods = useForm<SignupStep2Data>({
    resolver: zodResolver(signupStep2Schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      course: '' as Course,
      githubUrl: '',
    },
  });

  const onSubmitStep2 = async (data: SignupStep2Data) => {
    try {
      if (email === '' || password === '') {
        showToast('이전 단계에서 이메일/비밀번호를 다시 입력해 주세요.');
        return;
      }
      if (!data) {
        showToast('정보를 다시 입력해 주세요.');
        return;
      }
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
      clear();
    } catch (e: any) {
      showToast('회원 가입 실패! 잠시 후 다시 시도해 주세요. 😭');
    }
  };

  return { ...methods, onSubmitStep2, email, password };
}
