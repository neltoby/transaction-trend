import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import connection  from './src/util';
import httpadapter  from './src/http-adapter';
import { userController, otherUserController } from './src/controller'

const PORT = process.env.PORT || 3000;
const app: Express = express();
const apiRoot: string = process.env.API_ROOT;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => await connection())();

app.get(`${apiRoot}/user/:id`, httpadapter(userController));

app.get(`${apiRoot}/trend/:id`, httpadapter(otherUserController));

app.get(`${apiRoot}/*`, (req: Request, res: Response) => {
  res.status(401).send({message: 'We do not all calls to this route'});
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app