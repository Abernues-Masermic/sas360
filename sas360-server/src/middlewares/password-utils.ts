import * as bcrypt from 'bcryptjs';

export function hashPassword(password:string): string {
    let hashPassword:string = '';
    try{
        const salt = bcrypt.genSaltSync(10);
        hashPassword = bcrypt.hashSync(password, salt);
        console.log("hashPasssword ->",  this.password);
    }
    catch(error){
        console.log("Error hashPasssword ->", error);
    }
    return hashPassword;
}

export function checkPassword(password:string, userpassword:string): boolean {
    return bcrypt.compareSync(password, userpassword);
}