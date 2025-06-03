import { z } from 'zod';

const FILE_SIZE = 10 * 1024 * 1024;

export const profileImageSchema = z.object({
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || /\.(png|jpeg|jpg|webp)$/i.test(file.name), {
      message: '이미지 파일 형식은 png, jpg, jpeg, webp만 가능합니다.',
    })
    .refine((file) => !file || file.size <= FILE_SIZE, {
      message: '파일 크기는 최대 10MB입니다.',
    }),
});
