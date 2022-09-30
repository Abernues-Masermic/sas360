import { Router } from 'express';
import DeviceController from '../controller/DeviceController';
import { ENTITY_TYPE } from '../entity/EnumTypes';
import { checkJwt } from '../middlewares/jwt';

const router = Router()


router.get('/', checkJwt(ENTITY_TYPE.DEVICE), DeviceController.getAll);

router.get('/:id', checkJwt(ENTITY_TYPE.DEVICE), DeviceController.getById);

router.post('/', checkJwt(ENTITY_TYPE.DEVICE), DeviceController.newDevice);

router.patch('/:id', checkJwt(ENTITY_TYPE.DEVICE), DeviceController.editDevice);

router.delete('/:id', checkJwt(ENTITY_TYPE.DEVICE), DeviceController.deleteDevice);

export default router;