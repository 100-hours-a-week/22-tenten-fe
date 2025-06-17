import UserInput from '../../../entities/users/components/UserInput';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { z } from 'zod';
import { passwordConfirmSchema } from '@/features/auth/schemas/passwordConfirmSchema';

type PasswordStepFormData = z.infer<typeof passwordConfirmSchema>;

interface PasswordStepProps {
  register: UseFormRegister<PasswordStepFormData>;
  errors: FieldErrors<PasswordStepFormData>;
  trigger: UseFormTrigger<PasswordStepFormData>;
  passwordLabel: string;
  confirmLabel: string;
  passwordPlaceholder: string;
  confirmPlaceholder: string;
}

export default function PasswordStep({
  register,
  errors,
  trigger,
  passwordLabel,
  confirmLabel,
  passwordPlaceholder,
  confirmPlaceholder,
}: PasswordStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <UserInput
        label={passwordLabel}
        placeholder={passwordPlaceholder}
        type="password"
        errorMessage={errors.password?.message || ''}
        {...register('password', {
          onChange: () => {
            trigger('confirm');
          },
        })}
      />
      <UserInput
        label={confirmLabel}
        placeholder={confirmPlaceholder}
        type="password"
        errorMessage={errors.confirm?.message || ''}
        {...register('confirm')}
      />
    </div>
  );
}
