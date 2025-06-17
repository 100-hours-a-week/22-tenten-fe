import { z } from 'zod';
import { passwordSchema } from './passwordSchema';

export const passwordConfirmSchema = z
  .object({
    password: passwordSchema,
    confirm: z
      .string()
      .min(1, { message: '*비밀번호를 한 번 더 입력해 주세요.' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        path: ['confirm'],
        code: z.ZodIssueCode.custom,
        message: '*비밀번호가 일치하지 않습니다.',
      });
    }
  });
