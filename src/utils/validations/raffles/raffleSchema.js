import { z } from 'zod';

const now = new Date().toISOString();

export const raffleSchema = z
  .object({
    name: z.string().min(6, 'name_min').max(100, 'name_max'),
    description: z.string().max(255, 'description_max').optional().nullable(),
    initDate: z.string().min(1, 'init_date_required'),
    endDate: z.string().min(1, 'end_date_required'),
    price: z.coerce.number().min(1000, 'price_min').positive('price_positive'),
    ticketCount: z.coerce.number().int().min(10, 'ticketCount_min'),
  })
  .superRefine((data, ctx) => {
    const init = new Date(data.initDate);
    const end = new Date(data.endDate);
    if (isNaN(init.getTime()) || isNaN(end.getTime())) return;
    if (end <= init) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'endDate must be greater than initDate',
        code: z.ZodIssueCode.custom,
      });
    }
  });
