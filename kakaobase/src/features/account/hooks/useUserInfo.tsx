import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { accountInfoQueries } from '../api/accountInfoQueries';

export default function useUserInfo({ userId }: { userId: number }) {
  const [isOpen, setOpen] = useState(false);

  const userInfoMethods = useQuery(accountInfoQueries.userInfo(userId));

  function handleModal() {
    setOpen((prev) => !prev);
  }

  return {
    ...userInfoMethods,
    handleModal,
    isOpen,
  };
}
