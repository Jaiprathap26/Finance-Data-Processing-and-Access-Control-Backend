import { prisma } from '../config/database';
import { Role } from '../../generated/prisma';

export const userRepository = {
    findAll() {
        return prisma.user.findMany();
    },

    findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    },

    findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    },

    create(data: { email: string; password: string; name: string }) {
        return prisma.user.create({ data });
    },

    updateRole(id: string, role: Role) {
        return prisma.user.update({ where: { id }, data: { role } });
    },

    updateStatus(id: string, isActive: boolean) {
        return prisma.user.update({ where: { id }, data: { isActive } });
    },

    delete(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}