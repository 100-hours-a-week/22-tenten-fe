'use client';

import UserInput from '../../../entities/users/ui/UserInput';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import useLoginForm from '../hooks/useLoginForm';
import useRoutings from '@/shared/hooks/useRoutings';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
  } = useLoginForm();
  const { goSignupStep1 } = useRoutings();

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="h-screen flex justify-center items-center animate-slide-in"
    >
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <UserInput
            label="이메일"
            placeholder="이메일을 입력하세요."
            type="text"
            errorMessage={errors.email?.message || ''}
            {...register('email')}
          />
          <UserInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            type="password"
            errorMessage={errors.password?.message || ''}
            {...register('password')}
          />
        </div>

        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton text="로그인" disabled={!isValid} type="submit" />
          <SubmitButton
            text="회원가입하러 가기"
            onClick={goSignupStep1}
            type="button"
          />
        </div>
      </div>
    </form>
  );
}
