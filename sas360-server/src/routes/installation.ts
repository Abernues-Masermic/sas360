import { Router } from 'express';
import InstallationController from '../controller/InstallationController';

const router = Router()

//Get all users
router.get('/', InstallationController.getAll);

//Get one user
router.get('/:id',  InstallationController.getById);

//Create a new user
router.post('/', InstallationController.newInstallation);

//Edit user
router.patch('/:id', InstallationController.editInstallation);

//Delete user
router.delete('/:id', InstallationController.deleteInstallation);

export default router;