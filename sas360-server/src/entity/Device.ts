import { Contains, IsNotEmpty, Max, Min, MinLength,  IsIn } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as EnumTypes from "./EnumTypes";
import { LowerThan } from '../middlewares/validator-utils';
import { DecimalTransformer } from '../middlewares/transformer';

@Entity()
@Unique(['devicename'])
export class Device {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @MinLength(5)
    @Contains("SAS")
    devicename: string

    @Column({ name: 'warningrange', type: 'decimal', precision: 2, scale: 1, default: 0.0, transformer: new DecimalTransformer() })
    @Min(2)
    @Max(10)
    warningrange: number

    @Column({ name: 'cautionrange', type: 'decimal', precision: 2, scale: 1, default: 0.0, transformer: new DecimalTransformer() })
    @LowerThan('warningrange')
    cautionrange: number

    @Column({ name: 'alarmrange', type: 'decimal', precision: 2, scale: 1, default: 0.0, transformer: new DecimalTransformer() })
    @LowerThan('cautionrange')
    alarmrange: number

    @Column()
    @IsIn(EnumTypes.DEVICE_TYPE._.values)
    type: number

    @Column()
    @IsNotEmpty()
    installation: string

}
