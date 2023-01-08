import { Response } from 'express';
import { StateLoader } from "./stateLoader";

let loader = new StateLoader();

const reset = (res: Response) => {

    loader.reset();

    res.status(204).json(loader.state);
}

const get = (res: Response) => {

    loader.load();
    res.status(200).json(loader.state);
}

export default {
    reset,
    get
};