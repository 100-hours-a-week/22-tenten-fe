import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { accountQueries } from '../api/accountQueries';

export default function useUserInfo({ userId }: { userId: number }) {
  const [isOpen, setOpen] = useState(false);

  const userInfoMethods = useQuery(accountQueries.userInfo(userId));

  function handleModal() {
    setOpen((prev) => !prev);
  }

  return {
    ...userInfoMethods,
    handleModal,
    isOpen,
  };
}
