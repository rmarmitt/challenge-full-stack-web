import express from 'express';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import {createConnection, } from 'typeorm';

dotenv.config();
createConnection();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(routes);
//app.use(errorHandler)

app.listen(process.env.APP_PORT);
