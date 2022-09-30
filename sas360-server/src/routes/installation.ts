
import { Router } from 'express';
import InstallationController from '../controller/InstallationController';
import { ENTITY_TYPE } from '../entity/EnumTypes';
import { checkJwt } from '../middlewares/jwt';

const router = Router()

//Get all users
router.get('/', checkJwt(ENTITY_TYPE.INSTALLATION), InstallationController.getAll);

//Get one user
router.get('/:id', checkJwt(ENTITY_TYPE.INSTALLATION), InstallationController.getById);

//Create a new user
router.post('/', checkJwt(ENTITY_TYPE.INSTALLATION), InstallationController.newInstallation);

//Edit user
router.patch('/:id', checkJwt(ENTITY_TYPE.INSTALLATION), InstallationController.editInstallation);

//Delete user
router.delete('/:id', checkJwt(ENTITY_TYPE.INSTALLATION), InstallationController.deleteInstallation);

export default router;