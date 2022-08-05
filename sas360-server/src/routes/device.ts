import { Router } from 'express';
import DeviceController from '../controller/DeviceController';

const router = Router()


router.get('/', DeviceController.getAll);

router.get('/:id', DeviceController.getById);

router.post('/', DeviceController.newDevice);

router.patch('/:id', DeviceController.editDevice);

router.delete('/:id', DeviceController.deleteDevice);

export default router;