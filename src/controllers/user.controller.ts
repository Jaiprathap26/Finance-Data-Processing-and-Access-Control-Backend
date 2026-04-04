import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { ApiResponse } from '../utils/api-response';

export const userController = {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(ApiResponse.success(users));
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(ApiResponse.success(user));
        } catch (error) {
            next(error);
        }
    },

    async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.updateRole(req.params.id, req.body.role);
            res.status(200).json(ApiResponse.success(user, 'Role updated'));
        } catch (error) {
            next(error);
        }
    },

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.updateStatus(req.params.id, req.body.isActive);
            res.status(200).json(ApiResponse.success(user, 'Status updated'));
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json(ApiResponse.success(null, 'User deleted'));
        } catch (error) {
            next(error);
        }
    },
};