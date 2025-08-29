import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { editGithub } from '@/features/account/api/editProfile';
import { queryClient } from '@/shared/api/queryClient';
import { accountInfoQueries } from '../api/accountInfoQueries';

export type githubData = { githubUrl: string };

export default function useGithubEditHook() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { githubUrl, setUserInfo } = useUserStore();

  const methods = useForm<githubData>({
    resolver: async (...args) => {
      const [{ z }, { zodResolver }, { githubUrlSchema }] = await Promise.all([
        import('zod'),
        import('@hookform/resolvers/zod'),
        import('@/entities/users/schemas/githubSchema'),
      ]);
      const schema = z.object({ githubUrl: githubUrlSchema });
      return zodResolver(schema)(...args);
    },
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      githubUrl,
    },
  });

  const onSubmit = async (data: githubData) => {
    try {
      setLoading(true);
      await editGithub({ url: data.githubUrl });
      setUserInfo({ githubUrl: data.githubUrl });
      queryClient.invalidateQueries({ queryKey: accountInfoQueries.all() });
      showToast('깃허브 링크 변경 완료! ✌️');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, ...methods, githubUrl };
}
