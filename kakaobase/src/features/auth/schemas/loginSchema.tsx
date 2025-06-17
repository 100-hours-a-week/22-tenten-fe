import { z } from 'zod';
import { emailSchema } from '../../authEmail/schemas/emailSchema';
import { passwordSchema } from './passwordSchema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
