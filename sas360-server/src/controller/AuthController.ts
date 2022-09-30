import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';
import { checkPassword } from "../middlewares/password-utils";

class AuthController {
    static login = async(req:Request, res: Response) => {

        console.log("LOGIN", req.body); 

        const { username, password } = req.body;

        if (!(username && password)){
            res.status(400).json({message: 'Username & Password are required!'});
        }

        const userRepository = AppDataSource.getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail({
                where: { username },
            })
        }
        catch(e){
            return res.status(400).json({message:'Username or password incorrect!'});
        }

        //Check password
        if (!checkPassword(password, user.password)){
            return res.status(400).json({message:'Username or Password are incorrect!'})
        }

        const token = jwt.sign ({ userId: user.id, username: user.username }, config.jwtSecret, {expiresIn:'300h'});
        const refreshToken = jwt.sign ({ userId: user.id, username: user.username }, config.jwtSecretRefresh, {expiresIn:'300h'});

        //Guardar los token en la BD
        user.refreshToken = refreshToken;
        try{
            await userRepository.save(user);
        }
        catch(error){
            return res.status(400).json({ message:'Something goes wrong!' });
        }

        res.json({ message: 'OK', token:token, refreshToken:refreshToken, userId: user.id, role: user.role, installation: user.installation  });
    };

    /*
    static changePassword = async(req:Request, res:Response) =>{

        console.log('RES LOCALS ->', res.locals.jwtPayload);

        
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword))
        {
            res.status(400).json({message: 'Old password & new password are required'});
        }

        const userRepository = AppDataSource.getRepository(User);
        let user : User;

        try{
            user = await userRepository.findOneOrFail({
                where: {
                    id: Number(userId),
                }
            });
        }catch(error){
            res.status(400).json({message:'Something goes wrong!'});
        }

        if (!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'Check your old Password'})
        }


        user.password = newPassword;
        const validationOps = {validationError:{target:false, value:false}};
        const errors = await validate(user, validationOps);

        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        //Hash password
        user.hashPassword();
        userRepository.save(user);

        res.json({message:'Password change!'});
    };

    static forgotPassword = async(req:Request, res:Response) =>{
        const { username } = req.body;
        if (!username){
            return res.status(400).json({message:'username is required!'});
        }

        const message = 'Check your email for a link to reset your password.';
        let verificationLink;
        let emailStatus = 'OK';

        const userRepository = AppDataSource.getRepository(User);
        let user : User;

        try{
            user = await userRepository.findOneOrFail({
                where: {
                    username: username,
                }
            });
            const token = jwt.sign({userId:user.id, username:user.username}, config.jwtSecretReset,{expiresIn:'10m'});
            verificationLink = `http://localhost:4200/new-password/${token}`;
            user.resetToken = token;
        }
        catch(error){
            return res.json({ message: error });
        }


        try{
          // send mail with defined transport object
          await transporter.sendMail({
            from: '"Forgot password 👻" <anderber2000@gmail.com>', // sender address
            to: user.username, // list of receivers
            subject: "Forgot password ✔", // Subject line
            html: `
            <b>Please click on the following link, or pate this into your browser to complete the process:</b>
            <a href="${verificationLink}">${verificationLink}</a>
            `,
          });
        }
        catch(error){
            emailStatus = error;
            return res.status(400).json({message:'Something goes wrong!'});
        }

        try{
            await userRepository.save(user);
        }
        catch(error){
            emailStatus = error;
            return res.status(400).json({message:'Something goes wrong!'});
        }

        res.json({ message, info: emailStatus });
    }

    static createNewPassword = async(req:Request, res:Response) =>{
        const { newPassword } = req.body;
        const resetToken = req.headers['reset'] as string;

        if (!(resetToken && newPassword))
            return res.status(400).json({message:'All fields are required'});
        
        const userRepository = AppDataSource.getRepository(User);
        let jwtPayload;
        let user : User;
        try{
            jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
            user = await userRepository.findOneOrFail({
                where: {
                    resetToken: resetToken
                }
            });
        }
        catch(error){
            return res.status(401).json({ message:error });
        }

        user.password = newPassword;
        const validationOps = { validationError:{ target:false, value:false }};
        const errors = await validate(user, validationOps);

        if (errors.length > 0){
            console.log('Create new password -> User validate ->', user);
            return res.status(400).json(errors);
        }

        try{
            user.hashPassword();
            await userRepository.save(user);
        }
         catch(error){
            console.log('Create new password -> Save error ->', error);
            return res.status(401).json({ message: error });
        }

        res.json({ message: 'Password changed' });
    }

    static sendRefreshToken = async (req:Request, res:Response) =>{

        console.log("SEND REFRESH TOKEN"); 
        const refreshToken = req.headers['refresh'] as string;
        if (!refreshToken){
            return res.status(400).json({ message:'Something goes wrong!' });
        }

        const userRepository = AppDataSource.getRepository(User);
        let user : User;
        try{
            const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
            const { username } = verifyResult as User;
            user = await userRepository.findOneOrFail({
                where: {
                    username: username,
                }
            });
        }
        catch(error){
            return res.status(400).json( { message:error } )
        }

        const token = jwt.sign({ userId:user.id, username:user.username }, config.jwtSecret, { expiresIn:'60s' });
        res.json({ message:'OK', token:token, refreshToken:refreshToken, userID:user.id, role: user.role});
    }
    */

}

export default AuthController;

