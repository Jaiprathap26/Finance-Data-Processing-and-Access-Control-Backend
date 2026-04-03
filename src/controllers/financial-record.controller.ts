import { Request, Response, NextFunction } from 'express';
import { financialRecordService } from '../services/financial-record.service';
import { ApiResponse } from '../utils/api-response';

export const financialRecordController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialRecordService.getAll(req.query as any);
            res.status(200).json(ApiResponse.success(result));
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await financialRecordService.getById(req.params.id);
            res.status(200).json(ApiResponse.success(record));
        } catch (error) {
            next(error);
        }
    },

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await financialRecordService.create({
                ...req.body,
                userId: req.user!.id,
            });
            res.status(201).json(ApiResponse.success(record, 'Record created'));
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await financialRecordService.update(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(record, 'Record updated'));
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await financialRecordService.delete(req.params.id);
            res.status(200).json(ApiResponse.success(null, 'Record deleted'));
        } catch (error) {
            next(error);
        }
    },
};