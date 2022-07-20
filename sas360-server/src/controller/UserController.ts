import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validate } from 'class-validator';
import { FindOptionsSelect } from "typeorm";

class UserController {

    static getAll = async (req:Request, res:Response) => {
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
    }

    static newUser = async (req:Request, res:Response) => {
        const  { username, password, role, installation } = req.body;
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        user.installation = installation
        user.resetToken = '';
        user.refreshToken = '';

        const userRepository = AppDataSource.getRepository(User);
        try{
            user.hashPassword();
            await userRepository.save(user);
        }
        catch(error){
            return res.status(409).json({message:'Username already exist!'})
        }

        res.status(200).json({username, role, installation});
    }

    static editUser = async (req:Request, res:Response) => {
    }

    static deleteUser = async (req:Request, res:Response) => {
    }
}

export default UserController;