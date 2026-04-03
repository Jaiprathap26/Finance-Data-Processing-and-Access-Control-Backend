import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../utils/api-response';

export const authController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(ApiResponse.success(user, 'User registered successfully'));
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authService.login(req.body);
            res.status(200).json(ApiResponse.success(result, 'Login successful'));
        } catch (error) {
            next(error);
        }
    },
};