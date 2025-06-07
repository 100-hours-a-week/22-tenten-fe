import { z } from 'zod';

export const githubSchema = z.object({
  githubUrl: z
    .string()
    .min(1, { message: '*자신의 깃허브 프로필 url을 입력해 주세요.' })
    .startsWith('https://github.com/', {
      message: '*깃허브 url 형식이 올바르지 않습니다.',
    }),
});
