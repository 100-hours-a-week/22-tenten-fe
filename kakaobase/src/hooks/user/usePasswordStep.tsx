import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordConfirmSchema } from '@/schemas/passwordConfirmSchema';
import { z } from 'zod';
import changePassword from '@/apis/changePassword';
import { useState } from 'react';

export type PasswordFormData = z.infer<typeof passwordConfirmSchema>;

export const usePasswordStep = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<PasswordFormData>({
    resolver: zodResolver(passwordConfirmSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  async function onSubmit({ email }: { email: string }) {
    try {
      setLoading(true);
      await changePassword({
        email: email,
        password: methods.getValues('password'),
      });
      alert('비밀번호 변경 완료');
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return { ...methods, onSubmit, loading };
};
