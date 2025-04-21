import { z } from 'zod';
import {
  AUTHORIZATION_STATUS_APPROVED,
  AUTHORIZATION_STATUS_REJECTED,
} from '../../generic/constants';

/**
 * Zod schema for validating the legal ticket text.
 */
export const authorizationSchema = z.object({
  ticketText: z
    .string({
      required_error: 'ticket_text_required',
      invalid_type_error: 'ticket_text_invalid',
    })
    .min(10, 'ticket_text_min')
    .max(1000, 'ticket_text_max'),
});

/**
 * Zod schema for validating review decision of an authorization.
 */
export const reviewAuthorizationSchema = z.object({
  rejectionReason: z
    .string()
    .max(1000, 'rejection_reason_max')
    .refine((val) => val.trim().length === 0 || val.trim().length >= 10, {
      message: 'rejection_reason_min',
    }),
});
