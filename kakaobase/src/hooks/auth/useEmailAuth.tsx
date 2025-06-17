import { useState } from 'react';
import { useAuthStore } from '@/stores/emailAuthStore';
import { useAuthTimer } from './useAuthTimer';
import { loginSchema } from '@/features/auth/schemas/loginSchema';
import sendEmail from '@/apis/auth/sendEmail';
import { usePathname } from 'next/navigation';
import verifyEmailCode from '@/apis/auth/verifyEmailCode';
import { useToast } from '@/app/ToastContext';

export const useEmailAuth = () => {
  const pathName = usePathname();
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증');
  const { showToast } = useToast();

  const {
    verificationAttempts,
    email,
    code,
    isVerified,
    setCode,
    setEmail,
    setVerified,
    incrementAttempt,
  } = useAuthStore();

  const timer = useAuthTimer(() => {
    setVerified(false);
  });

  const validateEmail = (email: string) => {
    const result = loginSchema.shape.email.safeParse(email);
    setEmailValid(result.success);
    setError(result.success ? '' : result.error.issues[0].message);
    return result.success;
  };

  const onSubmitEmail = async () => {
    setEmail(email);
    try {
      timer.start();
      if (pathName.includes('signup')) {
        await sendEmail({ email, purpose: 'sign-up' });
      } else if (pathName.includes('password')) {
        await sendEmail({ email, purpose: 'password-change' });
      } else {
        await sendEmail({ email, purpose: 'unregister' });
      }
      setEmailValid(true);
      setCodeValid(true);
    } catch (e: any) {
      timer.stop();
      if (e.response.data.error === 'resource_alread_exists') {
        setError('*이미 가입된 이메일입니다.');
      } else {
        showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
      }
    }
  };

  const handleVerificationCode = async () => {
    if (code.length !== 6) return;

    try {
      await verifyEmailCode({ email, code });
      setCode(code);
      setVerified(true);
      setCodeError('');
      setEmailValid(false);
      setCodeValid(false);
      setCodeButtonLabel('완료');
      timer.stop();
      showToast('이메일 인증 성공! ✌️');
    } catch (e: any) {
      if (e.response.data.error === 'email_code_invalid') {
        incrementAttempt();
        setCodeError(
          `*인증에 실패하였습니다. (시도 ${verificationAttempts + 1}/3)`
        );
        return;
      } else if (e.response.data.error === 'email_code_fail_logout') {
        setCodeError(`*인증에 실패하였습니다. 잠시 후 시도해 주세요.`);
        setVerified(false);
      } else {
        showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
      }
    }
  };

  return {
    email,
    code,
    setEmail,
    setCode,
    error,
    isEmailValid,
    validateEmail,
    onSubmitEmail,
    handleVerificationCode,
    codeError,
    timer,
    isVerified,
    codeButtonLabel,
    isCodeValid,
  };
};
