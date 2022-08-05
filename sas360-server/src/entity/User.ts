import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

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
}
