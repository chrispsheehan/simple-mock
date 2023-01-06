import { saveState, getState } from "./state";
import { logRequest } from "./logger";
import { StateObject } from "stateObject";
import { createGuid } from "./helper";

const health = (_, response) => {

    response.json({health: 'OK'});
}

const invalid = (request, response) => {

    logRequest('INVALID ROUTE URL', request);
    response.status(404).json({message: "invalidRoute"})
}

const getUsers = (request, response) => {

    let userid = request.query.userid;

    let state: StateObject = getState();

    if(userid) {

        let user = state.users.filter(user => user.id === userid)
        response.status(200).json(user[0]);
    }
    else {
        response.status(200).json(state.users);
    }
}

const postUser = (request, response) => {
    
    let newUser = request.body;

    let state: StateObject = getState();

    if (state.users.filter(user => user.firstName === newUser.firstName && user.lastName === newUser.lastName).length > 0) {
        response.status(400).json({badrequest: "User already exists"});
    }
    else {
        let savedUser = {...newUser, ...{id: createGuid()}}
        state.users.push(savedUser);
        saveState(state);
        response.status(201).json(savedUser);
    }
}

export default {
    health,
    invalid,
    getUsers,
    postUser
};