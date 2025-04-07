import { z } from 'zod';

/**
 * Schema definition for created user validation using Zod.
 * @constant {ZodObject} userSchema - The schema for validating user data.
 */
export const userSchema = z.object({
  firstName: z.string().min(2, 'first_name_error').max(100, 'first_name_error'),
  lastName: z.string().min(2, 'last_name_error').max(100, 'last_name_error'),
  email: z.string().email('email_error').max(50, 'email_error'),
  password: z.string().min(6, 'password_error').max(255, 'password_error'),
});

/**
 * Schema definition for update user validation using Zod.
 * @constant {ZodObject} userSchema - The schema for validating user data.
 */
export const userEditSchema = z.object({
  firstName: z.string().min(2, 'first_name_error').max(100, 'first_name_error'),
  lastName: z.string().min(2, 'last_name_error').max(100, 'last_name_error'),
  role: z.string().optional(),
});
