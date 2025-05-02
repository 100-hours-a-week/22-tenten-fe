import UserInput from '../inputs/UserInput';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { passwordConfirmSchema } from '@/schemas/passwordConfirmSchema';

type PasswordStepFormData = z.infer<typeof passwordConfirmSchema>;

interface PasswordStepProps {
  register: UseFormRegister<PasswordStepFormData>;
  errors: FieldErrors<PasswordStepFormData>;
}

export default function PasswordStep({ register, errors }: PasswordStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <UserInput
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        type="password"
        errorMessage={errors.password?.message || ''}
        {...register('password')}
      />
      <UserInput
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더입력하세요."
        type="password"
        errorMessage={errors.confirm?.message || ''}
        {...register('confirm')}
      />
    </div>
  );
}
