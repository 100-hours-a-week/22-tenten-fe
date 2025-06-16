import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, { message: '*이메일을 입력해 주세요.' })
  .email({ message: '*올바른 이메일 형식이 아닙니다.' });
