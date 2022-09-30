import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validate } from 'class-validator';
import { FindOptionsSelect } from "typeorm";
import { hashPassword } from "../middlewares/password-utils";

class UserController {

    static getAll = async (req:Request, res:Response) => {
        console.log("GET ALL USERS"); 
        const userRepository = AppDataSource.getRepository(User);
        let users: User | any;
        try{
            let fields = ['id', 'username', 'role','installation'] as FindOptionsSelect<User> ;
            users = await userRepository.find({ select: fields });
        }
        catch{
            return res.status(404).json({message:'Something goes wrong!'});
        }

        if (users.length > 0 )
            res.send(users);
        else
            return res.status(404).json({message:'Not result'});
    }

    static getById = async (req:Request, res:Response) => {
        console.log("GET USER BY ID ->", req.params); 
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
        try{
            const user = await userRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            });
            res.send(user);
        }
        catch(e){
            res.status(404).json({message:'Not result'});
        }
    }

    static newUser = async (req:Request, res:Response) => {
        console.log('NEW USER ->', req.body);
        const  { username, password, role, installation } = req.body;
        const user = new User();
        user.username = username;
        user.password = hashPassword(password);
        user.role = role;
        user.installation = installation
        user.resetToken = '';
        user.refreshToken = '';

        //Validate
        const validationOpt = { validationError: {target:false, value:false} }
        const errors = await validate(user, validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        else{
            const userRepository = AppDataSource.getRepository(User);
            try{
                await userRepository.save(user);
            }
            catch(error){
                return res.status(409).json({message:'Username already exist!'})
            }
        }
        res.status(200).json({username, role, installation});

    }

    static editUser = async (req:Request, res:Response) => {
        console.log("EDIT USER ->", req.params, req.body); 
        let user: User;
        const { id } = req.params;
        const { username, password, role, installation } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        try{
            user = await userRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            });
            user.username = username;
            user.password = hashPassword(password);
            user.role = role;
            user.installation = installation;
            user.resetToken = '';
            user.refreshToken = '';
        }
        catch(e){
            return res.status(404).json({message:'User not found'})
        }

        //Validate
        const validationOpt = { validationError: { target:false, value:false } }
        const errors = await validate(user, validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        //Update
        await userRepository.update({ id: Number(id) }, user)
        .then(() => {
            res.status(201).json({ message:'User update' });
        })
        .catch(err => {
            return res.status(409).json({message:`Something goes wrong -> ${err}`})
        });
    }

    static deleteUser = async (req:Request, res:Response) => {
        console.log("DELETE USER ->", req.params); 
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
        let user: User;

        try{
           user = await userRepository.findOneOrFail({
            where: {
                id: Number(id),
            },
        }); 
        }
        catch(e){
            return res.status(404).json({ message: 'User not found' })
        }

        //Remove user
        userRepository.delete(id);
        res.status(201).json({ message: 'User deleted' });
    }
}

export default UserController;