import { z } from 'zod';
import { RecordType } from '../../generated/prisma';

export const createRecordSchema = z.object({
    amount: z.number().positive(),
    type: z.nativeEnum(RecordType),
    category: z.string().min(1),
    date: z.string().datetime(),
    notes: z.string().optional(),
});

export const updateRecordSchema = createRecordSchema.partial();

export const recordQueryScheam = z.object({
    type: z.nativeEnum(RecordType).optional(),
    category: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
});

export type createRecordInput = z.infer<typeof createRecordSchema>;
export type updateRecordInput = z.infer<typeof updateRecordSchema>;
export type recordQueryInput = z.infer<typeof recordQueryScheam>;