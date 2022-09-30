import { Contains, IsIn, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as EnumTypes from "./EnumTypes";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Contains("SAS")
    @IsNotEmpty({message:'Please enter something from device name'})
    devicename: string

    @Column()
    @IsNotEmpty({message:'Please enter something from Date'})
    instant: Date

    @Column({ nullable: true })
    closedinstant: Date

    @Column()
    @IsIn(EnumTypes.SEVERITY_TYPE._.values)
    severity: number

    @Column()
    info: string

    @Column()
    @IsIn(EnumTypes.STATE_TYPE._.values)
    state: number

}
