import { useEmailAuth } from '@/hooks/auth/useEmailAuth';
import SubmitButtonSmall from '../common/SubmitButtonSmall';
import UserInput from '../inputs/UserInput';

export default function EmailAuthStep() {
  const {
    code,
    setCode,
    email,
    setEmail,
    error,
    isEmailValid,
    validateEmail,
    sendCode,
    verifyCode,
    isCodeValid,
    codeError,
    timer,
    codeButtonLabel,
  } = useEmailAuth();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <UserInput
          label="이메일"
          placeholder="이메일을 입력하세요."
          type="text"
          errorMessage={
            timer.isRunning
              ? `${timer.formatted} 메일이 오지 않았다면, 스펨 메일함을 확인해 주세요.`
              : error
          }
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          className="whitespace-pre-line"
        />
        <SubmitButtonSmall
          label="전송"
          disabled={!isEmailValid}
          onClick={sendCode}
          type="button"
        />
      </div>
      <div className="flex items-center gap-4">
        <UserInput
          label="인증번호"
          placeholder="인증번호를 입력하세요.(6자리)"
          type="number"
          value={code}
          errorMessage={codeError}
          maxLength={6}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, '');
            if (onlyNumbers.length <= 6) setCode(onlyNumbers);
          }}
        />
        <SubmitButtonSmall
          label={codeButtonLabel}
          onClick={verifyCode}
          disabled={!isCodeValid}
          type="button"
        />
      </div>
    </div>
  );
}
