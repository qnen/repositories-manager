import express from 'express';
import mongoConnect from './database/connection.js';
import routes from './routes.js';

mongoConnect();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);

export default app;