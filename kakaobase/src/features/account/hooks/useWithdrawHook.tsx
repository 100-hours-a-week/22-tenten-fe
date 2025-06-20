import withdraw from '@/features/account/api/withdraw';
import { useState } from 'react';
import { useToast } from '@/shared/hooks/ToastContext';
import { useRouter } from 'next/navigation';

export default function useWithdrawHook() {
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  async function deleteUser() {
    try {
      setLoading(true);
      await withdraw();
      showToast('회원 탈퇴 성공! ✌️');
      router.push('/login');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  }
  return { deleteUser, setVerified, isVerified, loading };
}
