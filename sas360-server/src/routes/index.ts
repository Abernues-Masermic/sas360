import { Router } from 'express';
import auth from './auth';
import data from './data';
import device from './device';
import event from './event';
import user from './user';

const router = Router();

router.use('/auth', auth);
router.use('/data', data);
router.use('/device', device);
router.use('/event', event);
router.use('/user', user);

export default router;

