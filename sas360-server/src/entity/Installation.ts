import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";

@Entity()
@Unique(['installationname'])
export class Installation {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(5)
    @IsNotEmpty({message:'Please enter something from installation name'})
    installationname: string

    @Column()
    @MinLength(6)
    @IsOptional()
    description: string
}
