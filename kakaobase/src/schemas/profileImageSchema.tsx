import { z } from 'zod';
import { imageSchema } from './imageSchema';

export const profileImageSchema = z.object({
  imageFile: imageSchema,
});
