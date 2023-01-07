import { logRequest } from "./logger";
import { Request, Response } from 'express';

const health = (_, response) => {

    response.json({health: 'OK'});
}

const invalid = (req: Request, res: Response) => {

    logRequest('INVALID ROUTE URL', req);
    res.status(404).json({message: "invalidRoute"})
}

export default {
    health,
    invalid
};