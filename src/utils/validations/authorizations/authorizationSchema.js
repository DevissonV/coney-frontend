import { z } from 'zod';

/**
 * Zod schema for validating the rejection reason in authorization review.
 */
export const authorizationSchema = z.object({
  rejectionReason: z
    .string({
      required_error: 'rejection_reason_required',
      invalid_type_error: 'rejection_reason_invalid',
    })
    .min(10, 'rejection_reason_min')
    .max(1000, 'rejection_reason_max'),
});
