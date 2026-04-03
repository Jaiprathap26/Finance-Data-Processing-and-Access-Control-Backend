import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/api-error';

type ValidateTarget = 'body' | 'params' | 'query';

export const validate = (schema: ZodSchema, target: ValidateTarget = 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[target]);
        if (!result.success) {
            const details = result.error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            return next(new ApiError(400, 'Validation failed'));
        }
        req[target] = result.data;
        next();
    };
};