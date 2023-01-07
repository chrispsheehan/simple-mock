import { Request, Response } from 'express';
import { StateLoader } from "./stateLoader";

let loader = new StateLoader();

const reset = (req: Request, res: Response) => {

    loader.reset();

    res.status(204).json(loader.state);
}

const get = (req: Request, res: Response) => {

    loader.load();
    res.status(200).json(loader.state);
}

export default {
    reset,
    get
};