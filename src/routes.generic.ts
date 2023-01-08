import { Request, Response } from 'express';

const health = (req: Request, res: Response) => {

    res.json({health: 'OK'});
}

const invalid = (req: Request, res: Response) => {

    console.error(`\n*** ${req.url} ROUTE NOT SUPPORTED***\n`);
    res.status(404).json({message: "invalidRoute"})
}

export default {
    health,
    invalid
};