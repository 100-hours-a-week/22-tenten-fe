import { useState } from 'react';
import { useAuthTimer } from './useAuthTimer';
import sendEmail from '../api/sendEmail';
import verifyEmailCode from '../api/verifyEmailCode';
import { usePathname } from 'next/navigation';
import { emailAuthSchema } from '../schemas/emailAuthSchema';
import { useToast } from '@/shared/hooks/ToastContext';
import { useSignupStore } from '@/features/auth/stores/signupStore';

export const useEmailAuth = () => {
  const pathName = usePathname();
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증');
  const { showToast } = useToast();

  const { isVerified, setSignupStep1Info } = useSignupStore();
  const [email, setEmail] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [code, setCode] = useState('');

  const timer = useAuthTimer(() => {
    setSignupStep1Info({ isVerified: false });
  });

  const validateEmail = (email: string) => {
    const result = emailAuthSchema.shape.email.safeParse(email);
    setEmailValid(result.success);
    setError(result.success ? '' : result.error.issues[0].message);
    return result.success;
  };

  const onSubmitEmail = async () => {
    setEmail(email);
    try {
      const purpose = pathName.includes('signup')
        ? 'sign-up'
        : pathName.includes('password')
        ? 'password-change'
        : 'unregister';

      timer.start();
      await sendEmail({ email, purpose });

      setEmailValid(true);
      setCodeValid(true);
      setSignupStep1Info({ email: email });
    } catch (e: any) {
      timer.stop();
      if (e.response.data.error === 'resource_alread_exists') {
        setError('*이미 가입된 이메일입니다.');
      } else if (e.response.data.error === 'resource_not_found') {
        setError('*가입되지 않은 이메일입니다.');
      } else {
        showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
      }
    }
  };

  const onSubmitCode = async () => {
    if (code.length !== 6) return;

    try {
      await verifyEmailCode({ email, code });
      setCode(code);
      setSignupStep1Info({ isVerified: true });
      setCodeError('');
      setEmailValid(false);
      setCodeValid(false);
      setCodeButtonLabel('완료');
      timer.stop();
      showToast('이메일 인증 성공! ✌️');
    } catch (e: any) {
      if (e.response.data.error === 'email_code_invalid') {
        setAttemptCount((prev) => prev + 1);
        setCodeError(`*인증에 실패하였습니다. (시도 ${attemptCount + 1}/3)`);
        return;
      } else if (e.response.data.error === 'email_code_fail_logout') {
        setCodeError(`*인증에 실패하였습니다. 잠시 후 시도해 주세요.`);
        setSignupStep1Info({ isVerified: false });
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
    onSubmitCode,
    codeError,
    timer,
    isVerified,
    codeButtonLabel,
    isCodeValid,
  };
};
