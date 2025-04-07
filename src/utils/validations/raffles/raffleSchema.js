import { z } from 'zod';
import dayjs from 'dayjs';

export const raffleSchema = z
  .object({
    name: z.string().min(6, 'name_min').max(100, 'name_max'),
    description: z.string().max(255, 'description_max').optional().nullable(),
    initDate: z
      .custom((val) => dayjs.isDayjs(val), 'init_date_required')
      .refine((val) => val.isValid(), {
        message: 'init_date_invalid',
      }),
    endDate: z
      .custom((val) => dayjs.isDayjs(val), 'end_date_required')
      .refine((val) => val.isValid(), {
        message: 'end_date_invalid',
      }),
    price: z.coerce.number().min(1000, 'price_min').positive('price_positive'),
    ticketCount: z.coerce.number().int().min(10, 'ticketCount_min'),
  })
  .superRefine((data, ctx) => {
    if (!data.initDate || !data.endDate) return;

    const init = dayjs(data.initDate);
    const end = dayjs(data.endDate);

    if (!init.isValid() || !end.isValid()) return;

    if (end.isSame(init) || end.isBefore(init)) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'endDate_must_be_greater_than_initDate',
        code: z.ZodIssueCode.custom,
      });
    }
  });
