import { Router } from 'express';
import EventController from '../controller/EventController';

const router = Router()

router.get('/',  EventController.getAll);

router.get('/:devicename', EventController.getByDeviceName);

router.post('/', EventController.newEvent);

router.patch('/:id', EventController.editEvent);

router.delete('/:id', EventController.deleteEvent);

export default router;