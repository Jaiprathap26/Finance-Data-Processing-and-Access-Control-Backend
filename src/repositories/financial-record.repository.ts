import { prisma } from "../config/database";
import { RecordType } from "../../generated/prisma/enums";
import { CreateRecordInput, UpdateRecordInput, RecordQueryInput } from '../validators/financial-record.validator';

export const financialRecordRepository = {
    findAll(filters: RecordQueryInput) {
        const { type, category, startDate, endDate, page = 1, limit = 10 } = filters;
        return prisma.financialRecord.findMany({
            where: {
                ...(type && { type }),
                ...(category && { category }),
                ...(startDate || endDate
                    ? { date: { ...(startDate && { gte: new Date(startDate) }), ...(endDate && { lte: new Date(endDate) }) } }
                    : {}),
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { date: 'desc' },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
    },

    countAll(filters: RecordQueryInput) {
        const { type, category, startDate, endDate } = filters;
        return prisma.financialRecord.count({
            where: {
                ...(type && { type }),
                ...(category && { category }),
                ...(startDate || endDate
                    ? { date: { ...(startDate && { gte: new Date(startDate) }), ...(endDate && { lte: new Date(endDate) }) } }
                    : {}),
            },
        });
    },

    findById(id: string) {
        return prisma.financialRecord.findUnique({
            where: { id },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
    },

    create(data: CreateRecordInput & { userId: string }) {
        return prisma.financialRecord.create({
            data: { ...data, date: new Date(data.date) },
        });
    },

    update(id: string, data: UpdateRecordInput) {
        return prisma.financialRecord.update({
            where: { id },
            data: { ...data, ...(data.date && { date: new Date(data.date) }) },
        });
    },

    delete(id: string) {
        return prisma.financialRecord.delete({ where: { id } });
    },
};