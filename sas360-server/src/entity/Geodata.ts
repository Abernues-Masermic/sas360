import { Contains, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DecimalTransformer } from '../middlewares/transformer';

@Entity()
export class Geodata {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Contains("SAS")
    @IsNotEmpty({message:'Please enter something from device name'})
    devicename: string

    @Column()
    @IsNotEmpty({message:'Please enter something from Date'})
    instant: Date

    @Column({ name: 'positionx', type: 'decimal', precision: 7, scale: 4, default: 0.0, transformer: new DecimalTransformer() })
    positionx: number

    @Column({ name: 'positiony', type: 'decimal', precision: 7, scale: 4, default: 0.0, transformer: new DecimalTransformer() })
    positiony: number
}