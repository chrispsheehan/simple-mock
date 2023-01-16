import { mock } from "./mock/mock.app";
import { Request, Response } from 'express';

import userHandlers from './users';

const app = mock();

app
  .route("/users")
  .get(userHandlers.getUsers)
  .post(userHandlers.postUser);

app
  .route("/users/:userid")
  .get(userHandlers.getUser)

// log out invalid requests
app.all('/*', function(req: Request, res: Response) {
  console.error(`***ROUTE NOT SUPPORTED***\n`);
  res.status(404).json({message: "invalidRoute"})
});