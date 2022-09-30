import { Request,Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const checkRole = (roles: readonly any[]) => {
    return async(req:Request, res:Response, next:NextFunction)=> {
        console.log('Roles -> ', roles);
        const { userId } = res.locals.jwtPayload;

        const userRepository = AppDataSource.getRepository(User);
        let user : User;

        try{
            user = await userRepository.findOneOrFail({
                where: {
                    id: Number(userId),
                },
            });
        }
        catch(e){
            return res.status(401).json({message:'Not Authorized. User not exist'});
        }

        const { role } = user;
         
        if (roles[0].includes(role)){
            console.log('Authorized user with role ->', role);
            next();
        }
        else{
            console.log('Not authorized user with role ->', role);
            res.status(401).json({message:'Not Authorized. Login User is not an ADMIN'});
        }
    
    }
}