import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import financialRecordRoutes from './financial-record.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/records', financialRecordRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;