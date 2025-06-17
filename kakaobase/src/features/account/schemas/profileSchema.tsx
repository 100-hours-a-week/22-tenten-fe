import { z } from 'zod';
import { imageSchema } from '../../../schemas/imageSchema';
import { githubUrlSchema } from '@/schemas/githubSchema';

export const profileImageSchema = z.object({
  imageFile: imageSchema,
});

export const githubSchema = z.object({
  githubUrl: githubUrlSchema,
});
