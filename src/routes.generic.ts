import { Request, Response } from 'express';

const health = (_, response) => {

    response.json({health: 'OK'});
}

const invalid = (req: Request, res: Response) => {

    console.error(`\n*** ${req.url} ROUTE NOT SUPPORTED***\n`);
    res.status(404).json({message: "invalidRoute"})
}

export default {
    health,
    invalid
};