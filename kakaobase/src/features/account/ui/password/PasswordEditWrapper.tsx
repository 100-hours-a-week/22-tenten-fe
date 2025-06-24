'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import EmailAuthStep from '@/features/auth/ui/EmailAuthStep';
import PasswordStep from '@/features/auth/ui/PasswordStep';
import { usePasswordStep } from '@/features/auth/hooks/usePasswordStep';
import { useState } from 'react';

export default function PasswordEditWrapper() {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    onSubmit,
    loading,
  } = usePasswordStep();

  const [isVerified, setVerified] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="flex h-screen justify-center items-center animate-slide-in">
      <div className="bg-containerColor px-8 py-10 rounded-xl flex flex-col gap-8 items-center w-full max-w-sm">
        <div className="flex flex-col gap-6 w-full">
          <EmailAuthStep setVerified={setVerified} setEmailRef={setEmail} />
          <PasswordStep
            register={register}
            errors={errors}
            trigger={trigger}
            passwordLabel="새 비밀번호"
            passwordPlaceholder="새 비밀번호를 입력하세요."
            confirmLabel="비밀번호 확인"
            confirmPlaceholder="새 비밀번호를 한 번 더 입력하세요."
          />
        </div>
        <SubmitButton
          text="비밀번호 변경하기"
          disabled={!isValid || !isVerified}
          isLoading={loading}
          onClick={() => {
            onSubmit({ email });
          }}
        />
      </div>
    </div>
  );
}
