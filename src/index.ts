import { mock } from "./mock.app";
import { Request, Response } from 'express';

import routes from './routes';

const app = mock();

app.get('/health', (req: Request, res: Response) => { 
  res.json({health: 'OK'});
});

app.post('/users', (req: Request, res: Response) => { 
  routes.postUser(req, res);
});

app.get('/users', (req: Request, res: Response) => { 
  routes.getUsers(req, res);
});

// log out invalid requests
app.all('/*', function(req: Request, res: Response) {
  console.error(`***ROUTE NOT SUPPORTED***\n`);
  res.status(404).json({message: "invalidRoute"})
});