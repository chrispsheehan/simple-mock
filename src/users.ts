import { createGuid } from "./helper";
import { Request, Response } from 'express';

interface User {
    id: string,
    firstName: string,
    lastName: string
}


function usersExist(state: any): boolean {

    try {

        if (Array.isArray(state.users)) {
            return true;
        }
    } catch (error) {

        console.warn('user object not found');
        return false;
    }
}

function selectUser(req: Request): User[] {

    const { userid } = req.params;

    return global.state.data.users.filter((user: User) => user.id === userid);
}

function addUser(res: Response, newUser: User) {

    global.state.data.users.map((user: User) => [newUser].find((u: User) => u.id === user.id) || user);

    return res.status(200).json(newUser);    
}

function userNotFoundResponse(res: Response) {
    
    return res.status(400).json({ badrequest: "User not found" });
}

const getUser = (req: Request, res: Response) => {

    let user = selectUser(req);

    if(user.length) {
        res.status(200).json(user[0]);
    }
    else {
        userNotFoundResponse(res);
    }
}

const getUsers = (req: Request, res: Response) => {

    if(!usersExist(state.data)) {
        
        res.status(200).json({
            users: []
        });
    }
    else {

        res.status(200).json(global.state.data.users);
    }
}

const postUser = (req: Request, res: Response) => {

    let newUser = req.body;

    if(!usersExist(global.state.data)) { // create users if not there
        
        global.state.data = {
            users: []
        }
    }

    if (global.state.data.users.filter((user: User) => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        
        res.status(400).json({ badrequest: "User already exists" });
    }
    else {
        
        let savedUser = {...newUser, ...{id: createGuid()}}
        global.state.data.users.push(savedUser);
        res.status(201).json(savedUser);
    }
}

const putUser = (req: Request, res: Response) => {

    const newUser: User = req.body;

    let user = selectUser(req);

    if(user.length) {

        addUser(res, newUser);
    }
    else {

        userNotFoundResponse(res);
    }
}

const patchUser = (req: Request, res: Response) => {

    let user = selectUser(req);

    if(user.length) {

        const newUser: User = Object.assign(user[0], req.body);

        addUser(res, newUser);
    }
    else {

        userNotFoundResponse(res);
    }
}

export default {
    getUser,
    getUsers,
    postUser,
    putUser,
    patchUser
};