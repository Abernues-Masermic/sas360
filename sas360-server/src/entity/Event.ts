import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class Device {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pattern: string

    @Column()
    info: string

    @Column()
    installation: string

}
