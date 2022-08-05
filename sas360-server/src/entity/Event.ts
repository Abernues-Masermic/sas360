import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pattern: string

    @Column()
    info: string

    @Column()
    installation: string

}
