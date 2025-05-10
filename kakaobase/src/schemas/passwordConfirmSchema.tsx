import { z } from 'zod';

export const passwordConfirmSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '*비밀번호를 입력해 주세요.' })
      .min(8, { message: '*비밀번호는 최소 8자 이상이어야 합니다.' })
      .max(20, { message: '*비밀번호는 최대 20자까지 입력할 수 있습니다.' })
      .regex(/[A-Za-z]/, { message: '*영문은 최소 1자 이상 포함해야 합니다.' })
      .regex(/[0-9]/, { message: '*숫자를 최소 1자 이상 포함돼야 합니다.' })
      .regex(/[^A-Za-z0-9]/, {
        message: '*특수문자는 최소 1자 이상 포함돼야 합니다.',
      }),
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
