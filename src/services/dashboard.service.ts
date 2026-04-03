import { dashboardRepository } from '../repositories/dashboard.repository';
import { RecordType } from '../../generated/prisma/enums';

export const dashboardService = {
    async getSummary() {
        const result = await dashboardRepository.getSummary();
        const income = result.find((r) => r.type === RecordType.INCOME)?._sum.amount || 0;
        const expenses = result.find((r) => r.type === RecordType.EXPENSE)?._sum.amount || 0;
        return { income, expenses, netBalance: income - expenses };
    },

    async getCategoryTotals() {
        return dashboardRepository.getCategoryTotals();
    },

    async getRecentActivity() {
        return dashboardRepository.getRecentActivity();
    },

    async getTrends() {
        const records = await dashboardRepository.getTrends();
        const map = new Map<string, { income: number; expenses: number }>();

        for (const record of records) {
            const month = record.date.toISOString().slice(0, 7); // YYYY-MM
            if (!map.has(month)) map.set(month, { income: 0, expenses: 0 });
            const entry = map.get(month)!;
            if (record.type === RecordType.INCOME) entry.income += record.amount;
            else entry.expenses += record.amount;
        }

        return Array.from(map.entries()).map(([month, data]) => ({ month, ...data }));
    },
};