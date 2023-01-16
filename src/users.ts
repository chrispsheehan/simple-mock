import { createGuid } from "./helper";
import { Request, Response } from 'express';

const usersExist = (state: any): boolean => {
    
    try {
        
        if(Array.isArray(state.users)) {
            return true;
        }
    } catch (error) {

        console.warn('user object not found')
        return false;
    }
}

const getUser = (req: Request, res: Response) => {
    
    const { userid } = req.params;

    let user = global.state.data.users.filter((user: any) => user.id === userid)

    if(user.length) {
        res.status(200).json(user[0]);
    }
    else {
        res.status(400).json({ badrequest: "User not found" });
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

    if (global.state.data.users.filter((user: { firstName: string; lastName: string; }) => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        
        res.status(400).json({ badrequest: "User already exists" });
    }
    else {
        
        let savedUser = {...newUser, ...{id: createGuid()}}
        global.state.data.users.push(savedUser);
        res.status(201).json(savedUser);
    }
}

export default {
    getUser,
    getUsers,
    postUser
};