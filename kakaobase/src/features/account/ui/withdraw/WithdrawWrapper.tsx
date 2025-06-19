'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import EmailAuthStep from '@/features/auth/ui/EmailAuthStep';
import useWithdrawHook from '../../hooks/useWithdrawHook';

export default function WithdrawWrapper() {
  const { isVerified, setVerified, deleteUser, loading } = useWithdrawHook();

  return (
    <div className="flex justify-center items-center animate-slide-in">
      <div className="bg-containerColor px-8 py-10 rounded-xl flex flex-col gap-8 items-center w-full max-w-sm">
        <div className="flex flex-col w-full">
          <EmailAuthStep setVerified={setVerified} />
        </div>
        <SubmitButton
          text="회원 탈퇴하기"
          disabled={!isVerified}
          onClick={deleteUser}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
