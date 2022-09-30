import { ENTITY_TYPE } from './../entity/EnumTypes';
import { Router } from 'express';
import UserController from '../controller/UserController';
import { checkRole } from '../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import * as EnumTypes from "../entity/EnumTypes";

const router = Router()

//Get all users
router.get('/', [checkJwt(ENTITY_TYPE.USER), checkRole([EnumTypes.ROLE_TYPE._.values.slice(1,3)])], UserController.getAll);

//Get one user
router.get('/:id', [checkJwt(ENTITY_TYPE.USER), checkRole([EnumTypes.ROLE_TYPE._.values.slice(1,3)])], UserController.getById);

//Create a new user
router.post('/', [checkJwt(ENTITY_TYPE.USER), checkRole([EnumTypes.ROLE_TYPE._.values.slice(1,3)])], UserController.newUser);

//Edit user
router.patch('/:id', [checkJwt(ENTITY_TYPE.USER), checkRole([EnumTypes.ROLE_TYPE._.values.slice(1,3)])], UserController.editUser);

//Delete user
router.delete('/:id', [checkJwt(ENTITY_TYPE.USER), checkRole([EnumTypes.ROLE_TYPE._.values.slice(1,3)])], UserController.deleteUser);

export default router;