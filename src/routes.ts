import { saveState, getState } from "./state";
import { logRequest } from "./logger";
import { StateObject } from "stateObject";
import { createGuid } from "./helper";
import { Request, Response } from 'express';

const health = (_, response) => {

    response.json({health: 'OK'});
}

const invalid = (req: Request, res: Response) => {

    logRequest('INVALID ROUTE URL', req);
    res.status(404).json({message: "invalidRoute"})
}

const getUsers = (req: Request, res: Response) => {

    let userid = req.query.userid;

    let state: StateObject = getState();

    if(userid) {

        let user = state.users.filter(user => user.id === userid)
        res.status(200).json(user[0]);
    }
    else {
        res.status(200).json(state.users);
    }
}

const postUser = (req: Request, res: Response) => {
    
    let newUser = req.body;

    let state: StateObject = getState();

    if (state.users.filter(user => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        res.status(400).json({badrequest: "User already exists"});
    }
    else {
        let savedUser = {...newUser, ...{id: createGuid()}}
        state.users.push(savedUser);
        saveState(state);
        res.status(201).json(savedUser);
    }
}

export default {
    health,
    invalid,
    getUsers,
    postUser
};