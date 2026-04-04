import { Router } from 'express';
import { financialRecordController } from '../controllers/financial-record.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createRecordSchema, updateRecordSchema, recordQuerySchema } from '../validators/financial-record.validator';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.use(authenticate);

router.get('/', authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), validate(recordQuerySchema, 'query'), financialRecordController.getAll);
router.get('/:id', authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), financialRecordController.getById);
router.post('/', authorize(Role.ADMIN), validate(createRecordSchema), financialRecordController.create);
router.patch('/:id', authorize(Role.ADMIN), validate(updateRecordSchema), financialRecordController.update);
router.delete('/:id', authorize(Role.ADMIN), financialRecordController.delete);

export default router;