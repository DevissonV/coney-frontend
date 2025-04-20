import { z } from 'zod';

/**
 * Zod schema for validating the creation of an authorization.
 * Ensures the legal ticket text is present and within limits.
 */
export const authorizationSchema = z.object({
  ticketText: z
    .string({
      required_error: 'ticket_text_required',
      invalid_type_error: 'ticket_text_invalid',
    })
    .min(10, 'ticket_text_min')
    .max(300, 'ticket_text_max'),
});
