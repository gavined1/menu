import { z } from 'zod';

// ============================================
// Base Schemas
// ============================================

export const emailSchema = z
  .string()
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters');

// ============================================
// Auth Schemas
// ============================================

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signInWithMagicLinkSchema = z.object({
  email: emailSchema,
  next: z.string().optional(),
});

export const signInWithProviderSchema = z.object({
  provider: z.enum(['google', 'github', 'twitter']),
  next: z.string().optional(),
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// ============================================
// Derived Types
// ============================================

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type SignInWithMagicLinkInput = z.infer<
  typeof signInWithMagicLinkSchema
>;
export type SignInWithProviderInput = z.infer<typeof signInWithProviderSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
