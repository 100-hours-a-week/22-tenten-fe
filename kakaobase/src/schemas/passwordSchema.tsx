import { z } from 'zod';

const passwordMessage =
  '*비밀번호는 숫자, 영문, 특수문자를 포함한 8~20자의 문자열이어야 합니다.';

export const passwordSchema = z
  .string()
  .min(1, { message: '*비밀번호를 입력해 주세요.' })
  .min(8, { message: passwordMessage })
  .max(20, { message: passwordMessage })
  .regex(/[A-Za-z]/, { message: passwordMessage })
  .regex(/[0-9]/, { message: passwordMessage })
  .regex(/[^A-Za-z0-9]/, {
    message: passwordMessage,
  });
