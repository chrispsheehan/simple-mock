import { createGuid } from "./helper";
import { Request, Response } from 'express';
import { StateLoader } from "./stateLoader";

let loader = new StateLoader();
let state = loader.state;

const usersExist = (): boolean => {
    try {
        if(state.users.length) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

const getUsers = (req: Request, res: Response) => {

    let userid = req.query.userid;

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

    if(!usersExist()) { // create users if not there
        state = {
            users: []
        }
    }

    if (state.users.filter((user: { firstName: string; lastName: string; }) => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        res.status(400).json({badrequest: "User already exists"});
    }
    else {
        let savedUser = {...newUser, ...{id: createGuid()}}
        state.users.push(savedUser);
        loader.save();
        res.status(201).json(savedUser);
    }
}

export default {
    getUsers,
    postUser
};