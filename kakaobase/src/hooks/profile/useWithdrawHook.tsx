import withdraw from '@/apis/withdraw';
import { useEffect, useState } from 'react';
import useTokenCheck from '../user/useTokenCheckHook';

export default function useWithdrawHook() {
  const { checkUnauthorized } = useTokenCheck();
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUnauthorized();
  });

  async function deleteUser() {
    try {
      setLoading(true);
      await withdraw();
      alert('회원 탈퇴 성공!');
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return { deleteUser, setVerified, isVerified, loading };
}
