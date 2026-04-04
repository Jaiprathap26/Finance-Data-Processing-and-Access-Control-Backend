import { z } from 'zod';

export const createRecordSchema = z.object({
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1),
    date: z.string().min(1),
    notes: z.string().optional(),
});

export const updateRecordSchema = createRecordSchema.partial();

export const recordQuerySchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
});

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
export type UpdateRecordInput = z.infer<typeof updateRecordSchema>;
export type RecordQueryInput = z.infer<typeof recordQuerySchema>;