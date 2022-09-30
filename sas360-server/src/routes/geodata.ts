import { Router } from 'express'
import GeodataController from '../controller/GeodataController';

const router = Router()

router.get('/', GeodataController.getAll);

router.get('/:devicename', GeodataController.getByDeviceName);

router.post('/', GeodataController.newData);

router.delete('/:devicename', GeodataController.deleteData);

export default router;