import { createGuid } from "./helper";
import { Request, Response } from 'express';
import { StateLoader } from "./stateLoader";

let loader = new StateLoader();

const usersExist = (): boolean => {
    try {
        if(loader.state.users.length) {
            return true;
        }
    } catch (error) {
        console.warn('user object not found')
        return false;
    }
}

const getUsers = (req: Request, res: Response) => {

    let userid = req.query.userid;

    if(!usersExist()) {
        res.status(200).json({
            users: []
        });
    }
    else {
        if(userid) {

            let user = loader.state.users.filter(user => user.id === userid)
            res.status(200).json(user[0]);
        }
        else {
            res.status(200).json(loader.state.users);
        }
    }
}

const postUser = (req: Request, res: Response) => {
    
    let newUser = req.body;

    if(!usersExist()) { // create users if not there
        loader.state = {
            users: []
        }
    }

    if (loader.state.users.filter((user: { firstName: string; lastName: string; }) => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        res.status(400).json({badrequest: "User already exists"});
    }
    else {
        let savedUser = {...newUser, ...{id: createGuid()}}
        loader.state.users.push(savedUser);
        loader.save();
        res.status(201).json(savedUser);
    }
}

export default {
    getUsers,
    postUser
};