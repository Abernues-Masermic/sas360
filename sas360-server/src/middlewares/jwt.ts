import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { ENTITY_TYPE } from '../entity/EnumTypes';

export const checkJwt = (entity_type: ENTITY_TYPE) => {
    return async(req:Request, res:Response, next:NextFunction)=> {
        console.log('CHECK JWT ' + entity_type + ' (auth header) ->', req.headers['auth']);
    
        const token = <string>req.headers['auth'];
        let jwtPayload;
    
        try{
            jwtPayload = <any>jwt.verify(token, config.jwtSecret); 
            res.locals.jwtPayload = jwtPayload
        }
        catch(e){
            return res.status(401).json({message:'Not Authorized'});
        }
    
        const { userId, username } = jwtPayload;
    
        const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn:'1h' });
        res.setHeader('token', newToken);
    
        next();
    }
}
