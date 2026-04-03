import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { env } from '../config/env';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

export const authService = {
    async register(input: RegisterInput) {
        const existing = await userRepository.findByEmail(input.email);
        if (existing) throw new ApiError(409, 'Email already in use');

        const hashed = await bcrypt.hash(input.password, 10);
        const user = await userRepository.create({ ...input, password: hashed });

        const { password, ...safeUser } = user;
        return safeUser;
    },

    async login(input: LoginInput) {
        const user = await userRepository.findByEmail(input.email);
        if (!user) throw new ApiError(401, 'Invalid credentials');
        if (!user.isActive) throw new ApiError(403, 'Account is inactive');

        const valid = await bcrypt.compare(input.password, user.password);
        if (!valid) throw new ApiError(401, 'Invalid credentials');

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES_IN }
        );

        const { password, ...safeUser } = user;
        return { user: safeUser, token };
    },
};