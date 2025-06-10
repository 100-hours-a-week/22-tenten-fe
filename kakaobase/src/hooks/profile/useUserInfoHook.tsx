import { getUserInfo } from '@/apis/profile';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useTokenCheck from '../user/useTokenCheckHook';

export default function useUserInfoHook({ userId }: { userId: number }) {
  const router = useRouter();
  const { checkUnauthorized } = useTokenCheck();

  const { setUserInfo } = useUserStore();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    checkUnauthorized();
  }, []);

  const methods = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await getUserInfo({ userId });
      if (response.is_me) {
        setUserInfo({
          name: response.name,
          githubUrl: response.github_url,
        });
      }
      return response;
    },
  });

  function handleModal() {
    setOpen((prev) => !prev);
  }

  function navEdit() {
    router.push(`${userId}/edit`);
  }

  return {
    ...methods,
    handleModal,
    navEdit,
    isOpen,
  };
}
