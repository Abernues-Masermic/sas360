import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional, IsIn } from "class-validator";
import * as EnumTypes from "./EnumTypes";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty({message:'Please enter something from user name'})
    username: string

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @Column()
    @IsIn(EnumTypes.ROLE_TYPE._.values)
    role: number

    @Column({ name: 'installation', nullable: true, type: 'varchar' })
    installation: string

    @Column()
    @IsOptional()
    resetToken: string;

    @Column()
    @IsOptional()
    refreshToken: string;
}
