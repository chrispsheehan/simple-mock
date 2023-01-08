import { mock } from "./mock.app";
import { Request, Response } from 'express';

import routes from './routes';

const app = mock();

app.post('/users', (req: Request, res: Response) => { 
  routes.postUser(req, res);
});

app.get('/users', (req: Request, res: Response) => { 
  routes.getUsers(req, res);
});