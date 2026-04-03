import { TypeOf, z } from 'zod';
import { Role } from '../../generated/prisma/enums';

export const updateRoleSchema = z.object({
    role: z.nativeEnum(Role),
});

export const updateStatusSchema = z.object({
    isActive: z.boolean(),
});

export type updateRoleInput = z.infer<typeof updateRoleSchema>;
export type updateStatusInput = z.infer<typeof updateStatusSchema>;