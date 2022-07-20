import * as express from "express";
import { AppDataSource } from "./data-source";
import * as cors from 'cors';
var helmet = require('helmet');
import routes from './routes';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();

    //Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use('/', routes);

    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

}).catch(error => console.log(error))
