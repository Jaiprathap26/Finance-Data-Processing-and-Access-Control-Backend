import { inflateRaw } from 'node:zlib';
import { Role } from '../..generated/prisma/enums';
import { isInternalThread } from 'node:worker_threads';

export interface JwtPayLoad {
    userId: string;
    email: string;
    role: Role;
}

export interface AuthenticatedUser {
    id: string;
    email: string;
    role: Role;
}

// Extends Express Request to carry the authenticated user
declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

