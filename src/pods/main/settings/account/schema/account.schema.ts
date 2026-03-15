import { z } from 'zod';

export const accountFormSchema = z.object({
  email: z.string().email({ message: 'Email cannot be empty' }),
  name: z.string().min(3, { message: 'Username must be at least 3 characters' }),
});

export type AccountFormFields = z.infer<typeof accountFormSchema>;
