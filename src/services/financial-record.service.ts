import { financialRecordRepository } from '../repositories/financial-record.repository';
import { ApiError } from '../utils/api-error';
import { CreateRecordInput, UpdateRecordInput, RecordQueryInput } from '../validators/financial-record.validator';

export const financialRecordService = {
    async getAll(filters: RecordQueryInput) {
        const [records, total] = await Promise.all([
            financialRecordRepository.findAll(filters),
            financialRecordRepository.countAll(filters),
        ]);
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        return { records, total, page, limit, totalPages: Math.ceil(total / limit) };
    },

    async getById(id: string) {
        const record = await financialRecordRepository.findById(id);
        if (!record) throw new ApiError(404, 'Record not found');
        return record;
    },

    async create(data: CreateRecordInput & { userId: string }) {
        return financialRecordRepository.create(data);
    },

    async update(id: string, data: UpdateRecordInput) {
        const record = await financialRecordRepository.findById(id);
        if (!record) throw new ApiError(404, 'Record not found');
        return financialRecordRepository.update(id, data);
    },

    async delete(id: string) {
        const record = await financialRecordRepository.findById(id);
        if (!record) throw new ApiError(404, 'Record not found');
        return financialRecordRepository.delete(id);
    },
};