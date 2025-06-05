import withdraw from '@/apis/withdraw';
import { useEffect, useState } from 'react';
import useTokenCheck from '../user/useTokenCheckHook';
import { useToast } from '@/app/ToastContext';

export default function useWithdrawHook() {
  const { checkUnauthorized } = useTokenCheck();
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    checkUnauthorized();
  });

  async function deleteUser() {
    try {
      setLoading(true);
      await withdraw();
      showToast('회원 탈퇴 성공! ✌️');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  }
  return { deleteUser, setVerified, isVerified, loading };
}
