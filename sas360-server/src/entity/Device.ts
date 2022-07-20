import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['devicename'])
export class Device {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    devicename: string

    @Column()
    noticerange: number

    @Column()
    cautionrange: number

    @Column()
    alarmrange: number

    @Column()
    type: number

    @Column()
    installation: string

}
