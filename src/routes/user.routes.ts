import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateRoleSchema, updateStatusSchema } from '../validators/user.validator';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.use(authenticate, authorize(Role.ADMIN));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id/role', validate(updateRoleSchema), userController.updateRole);
router.patch('/:id/status', validate(updateStatusSchema), userController.updateStatus);
router.delete('/:id', userController.deleteUser);

export default router;