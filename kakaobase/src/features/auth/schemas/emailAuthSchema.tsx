import { z } from 'zod';
import { emailSchema } from './emailSchema';

export const emailAuthSchema = z.object({
  email: emailSchema,
});
