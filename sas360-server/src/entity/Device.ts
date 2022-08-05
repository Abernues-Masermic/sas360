import { Contains, IsNotEmpty, Max, Min, MinLength,  IsIn } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as EnumTypes from "./EnumTypes";
import { LowerThan } from '../middlewares/validator-utils';

@Entity()
@Unique(['devicename'])
export class Device {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @MinLength(8)
    @Contains("SAS")
    devicename: string

    @Column()
    @Min(2)
    @Max(10)
    @IsNotEmpty()
    warningrange: number

    @Column()
    @LowerThan('warningrange')
    cautionrange: number

    @Column()
    @LowerThan('cautionrange')
    alarmrange: number

    @Column()
    @IsIn(EnumTypes.DEVICE_TYPE._.values)
    type: number

    @Column()
    @IsNotEmpty()
    installation: string

}
