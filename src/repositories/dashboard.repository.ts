import { prisma } from '../config/database';

export const dashboardRepository = {
    getSummary() {
        return prisma.financialRecord.groupBy({
            by: ['type'],
            _sum: { amount: true },
        });
    },

    getCategoryTotals() {
        return prisma.financialRecord.groupBy({
            by: ['category', 'type'],
            _sum: { amount: true },
            orderBy: { _sum: { amount: 'desc' } },
        });
    },

    getRecentActivity() {
        return prisma.financialRecord.findMany({
            take: 10,
            orderBy: { date: 'desc' },
            include: { user: { select: { id: true, name: true } } },
        });
    },

    getTrends() {
        return prisma.financialRecord.findMany({
            orderBy: { date: 'asc' },
            select: { amount: true, type: true, date: true },
        });
    },
};