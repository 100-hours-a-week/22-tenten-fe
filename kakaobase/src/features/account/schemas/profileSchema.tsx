import { z } from 'zod';
import { imageSchema } from '../../../entities/images/schemas/imageSchema';
import { githubUrlSchema } from '@/entities/users/schemas/githubSchema';

export const profileImageSchema = z.object({
  imageFile: imageSchema,
});

export const githubSchema = z.object({
  githubUrl: githubUrlSchema,
});
