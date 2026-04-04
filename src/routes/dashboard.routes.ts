import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.use(authenticate);

router.get('/summary', authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), dashboardController.getSummary);
router.get('/category-totals', authorize(Role.ANALYST, Role.ADMIN), dashboardController.getCategoryTotals);
router.get('/recent-activity', authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), dashboardController.getRecentActivity);
router.get('/trends', authorize(Role.ANALYST, Role.ADMIN), dashboardController.getTrends);

export default router;