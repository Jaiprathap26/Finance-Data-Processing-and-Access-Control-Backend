import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { Role } from '../../generated/prisma/enums';

export const userService = {
    async getAllUsers() {
        return userRepository.findAll();
    },

    async getUserById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) throw new ApiError(404, 'User not found');
        return user;
    },

    async updateRole(id: string, role: Role) {
        const user = await userRepository.findById(id);
        if (!user) throw new ApiError(404, 'User not found');
        return userRepository.updateRole(id, role);
    },

    async updateStatus(id: string, isActive: boolean) {
        const user = await userRepository.findById(id);
        if (!user) throw new ApiError(404, 'User not found');
        return userRepository.updateStatus(id, isActive);
    },

    async deleteUser(id: string) {
        const user = await userRepository.findById(id);
        if (!user) throw new ApiError(404, 'User not found');
        return userRepository.delete(id);
    },
};