import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class Data {

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
