import "reflect-metadata";
import { DataSource } from "typeorm";
import { Data } from "./entity/Data";
import { Device } from "./entity/Device";
import { Event } from "./entity/Event";
import { User } from "./entity/User";
import { Installation } from "./entity/Installation";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Masermic_1234",
    database: "sas360",
    synchronize: true,
    logging: false,
    entities: [Data, Device, Event, User, Installation],
    migrations: [],
    subscribers: [],
})
