import { useForm } from 'react-hook-form';
import changePassword from '@/features/account/api/changePassword';
import { useState } from 'react';
import { useToast } from '@/shared/hooks/ToastContext';

export type PasswordFormData = { password: string; confirm: string };

export const usePasswordStep = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const methods = useForm<PasswordFormData>({
    resolver: async (...args) => {
      const [{ zodResolver }, { passwordConfirmSchema }] = await Promise.all([
        import('@hookform/resolvers/zod'),
        import('../schemas/passwordConfirmSchema'),
      ]);
      return zodResolver(passwordConfirmSchema)(...args);
    },
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
      showToast('비밀번호 변경 성공! ✌️');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  }

  return { ...methods, onSubmit, loading };
};
