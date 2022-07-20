import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['devicename'])
export class Device {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    instant: Date

    @Column()
    value: number

    @Column()
    type: number

    @Column()
    installation: string

}
