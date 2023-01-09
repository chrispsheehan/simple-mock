import { createGuid } from "./helper";
import { Request, Response } from 'express';
import { State } from "./state";

const usersExist = (state: any): boolean => {
    try {
        if(state.users.length) {
            return true;
        }
    } catch (error) {
        console.warn('user object not found')
        return false;
    }
}

const getUsers = (req: Request, res: Response) => {

    res.status(200).json(global.state.data)
    // let userid = req.query.userid;

    // if(!usersExist(state)) {
    //     res.status(200).json({
    //         users: []
    //     });
    // }
    // else {
    //     if(userid) {

    //         let user = state.users.filter(user => user.id === userid)
    //         res.status(200).json(user[0]);
    //     }
    //     else {
    //         res.status(200).json(state.users);
    //     }
    // }
}

const postUser = (req: Request, res: Response) => {

    if(!usersExist(global.state.data)) { // create users if not there
        global.state.data = {
            users: []
        }
    }

    global.state.data.users.push({name: "ernie"})
    res.status(201).json(global.state.data)

    // let newUser = req.body;

    // if(!usersExist(state)) { // create users if not there
    //     state = {
    //         users: []
    //     }
    // }

    // if (state.users.filter((user: { firstName: string; lastName: string; }) => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
    //     res.status(400).json({badrequest: "User already exists"});
    // }
    // else {
    //     let savedUser = {...newUser, ...{id: createGuid()}}
    //     state.users.push(savedUser);
    //     res.status(201).json(savedUser);
    // }
}

export default {
    getUsers,
    postUser
};