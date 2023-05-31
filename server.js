import express from 'express';
import StartServer from './libs/boot';
import SetRoutes from './routes';
import SetMiddlewares from './libs/middlewares';

const server = express();

SetMiddlewares(server);
SetRoutes(server);
StartServer(server);

export default server;
