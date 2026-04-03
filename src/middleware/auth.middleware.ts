import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { JwtPayload } from '../types';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) throw new ApiError(401, 'No token provided');

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

        const user = await userRepository.findById(payload.userId);
        if (!user) throw new ApiError(401, 'User no longer exists');
        if (!user.isActive) throw new ApiError(403, 'Account is inactive');

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    } catch (error) {
        if (error instanceof ApiError) return next(error);
        next(new ApiError(401, 'Invalid or expired token'));
    }
};