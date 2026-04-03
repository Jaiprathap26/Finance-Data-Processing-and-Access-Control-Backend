import { Request, Response, NextFunction } from 'express';
import { Role } from '../../generated/prisma/enums';
import { ApiError } from '../utils/api-error';

export const authorize = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new ApiError(401, 'Not authenticated'));
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'Insufficient permissions'));
        }
        next();
    };
};