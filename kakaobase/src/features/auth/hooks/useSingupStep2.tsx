import signup from '@/features/auth/api/signup';
import { useToast } from '@/app/ToastContext';
import { courseMap } from '@/shared/lib/courseMap';
import { signupStep2Schema } from '@/features/auth/schemas/signupStep2Schema';
import { useSignupStore } from '@/features/auth/stores/signupStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type SignupStep2Data = z.infer<typeof signupStep2Schema>;

export default function useSignupForm() {
  const router = useRouter();
  const step1Info = useSignupStore((state) => state.step1);
  const step2Info = useSignupStore((state) => state.step2);
  const setStep2Info = useSignupStore((state) => state.setStep2);
  const { showToast } = useToast();

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
    setStep2Info({
      name: data.name,
      nickname: data.nickname,
      course: data.course,
      githubUrl: data.githubUrl,
    });
    try {
      if (!step1Info || !step2Info) return;
      const request = {
        email: step1Info.email,
        password: step1Info.password,
        name: step2Info.name,
        nickname: step2Info.nickname,
        class_name: courseMap[step2Info.course],
        github_url: step2Info.githubUrl,
      };

      await signup(request);

      showToast('회원 가입 성공! ✌️');
      router.push('/login');
    } catch (e: any) {
      showToast('회원 가입 실패! 잠시 후 다시 시도해 주세요. 😭');
    }
  };

  return { ...methods, onSubmitStep2, step1Info, step2Info };
}
