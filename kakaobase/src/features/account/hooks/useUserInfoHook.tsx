import { getUserInfo } from '@/features/account/api/profile';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useUserInfoHook({ userId }: { userId: number }) {
  const router = useRouter();

  const { setUserInfo } = useUserStore();
  const [isOpen, setOpen] = useState(false);

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
