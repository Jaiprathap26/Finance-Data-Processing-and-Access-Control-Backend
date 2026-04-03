import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboard.service';
import { ApiResponse } from '../utils/api-response';

export const dashboardController = {
    async getSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getSummary();
            res.status(200).json(ApiResponse.success(data));
        } catch (error) {
            next(error);
        }
    },

    async getCategoryTotals(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getCategoryTotals();
            res.status(200).json(ApiResponse.success(data));
        } catch (error) {
            next(error);
        }
    },

    async getRecentActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getRecentActivity();
            res.status(200).json(ApiResponse.success(data));
        } catch (error) {
            next(error);
        }
    },

    async getTrends(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getTrends();
            res.status(200).json(ApiResponse.success(data));
        } catch (error) {
            next(error);
        }
    },
};