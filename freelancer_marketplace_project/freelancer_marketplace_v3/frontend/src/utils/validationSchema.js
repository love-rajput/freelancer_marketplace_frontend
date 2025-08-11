import * as z from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username is required').max(30),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['client', 'freelancer'], { required_error: 'Role is required' }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});
