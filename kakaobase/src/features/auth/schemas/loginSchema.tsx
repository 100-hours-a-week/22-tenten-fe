import { z } from 'zod';
import { emailSchema } from '../../../schemas/emailSchema';
import { passwordSchema } from '../../../schemas/passwordSchema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
