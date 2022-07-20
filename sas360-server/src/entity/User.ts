import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column()
    @IsNotEmpty()
    installation: string

    @Column()
    @IsOptional()
    resetToken: string;

    @Column()
    @IsOptional()
    refreshToken: string;

    hashPassword():void{
        try{
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
        }
        catch(error){
            console.log("Error hashPasssword ->", error);
        }
    }

    checkPassword(password:string): boolean{
        return bcrypt.compareSync(password, this.password)
    }
}
