import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { accountQueries } from '../api/accountQueries';

export default function useUserInfo({ userId }: { userId: number }) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const userInfoMethods = useQuery(accountQueries.userInfo(userId));

  function handleModal() {
    setOpen((prev) => !prev);
  }

  function navEdit() {
    router.push(`${userId}/edit`);
  }

  return {
    ...userInfoMethods,
    handleModal,
    navEdit,
    isOpen,
  };
}
