import { z } from 'zod';

export const accountFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
});

export type AccountFormFields = z.infer<typeof accountFormSchema>;
