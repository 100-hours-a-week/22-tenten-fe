import { z } from 'zod';
import { emailSchema } from './emailSchema';

export const emailAuthSchema = z.object({
  email: emailSchema,
  code: z.string().length(6, { message: '' }),
});
