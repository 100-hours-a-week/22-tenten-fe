import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useTokenCheck from '../user/useTokenCheckHook';
import { useState } from 'react';
import { useToast } from '@/app/ToastContext';
import { useUserStore } from '@/stores/userStore';
import { githubSchema } from '@/schemas/githubSchema';
import { editGithub } from '@/apis/editProfile';

export type githubData = z.infer<typeof githubSchema>;

export default function useGithubEditHook() {
  const { checkUnauthorized } = useTokenCheck();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { githubUrl, setUserInfo } = useUserStore();

  const methods = useForm<githubData>({
    resolver: zodResolver(githubSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      githubUrl,
    },
  });

  const onSubmit = async (data: githubData) => {
    checkUnauthorized();
    try {
      setLoading(true);
      const response = await editGithub({ url: data.githubUrl });
      console.log(response);
      setUserInfo({ githubUrl: data.githubUrl });
      showToast('깃허브 링크 변경 완료! ✌️');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, ...methods, githubUrl };
}
