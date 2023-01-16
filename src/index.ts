import { mock } from "./mock/mock.app";
import userHandlers from './users';

const app = mock();

app
  .route("/users")
  .get(userHandlers.getUsers)
  .post(userHandlers.postUser);

app
  .route("/users/:userid")
  .get(userHandlers.getUser)