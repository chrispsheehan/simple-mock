import { saveState, getState } from "./state";
import { logRequest } from "./logger";
import { StateObject } from "stateObject";

const health = (request, response) => {
    
    logRequest('Handled', request);
    response.json({health: 'OK'});
}

const invalid = (request, response) => {

    logRequest('INVALID ROUTE URL', request);
    response.status(404).json({message: "invalidRoute"})
}

const getUsers = (request, response) => {

    let userid = request.query.userid;

    if(userid) {
        console.log('found email');
    }

    response.status(200).json({});
}

const postUser = (request, response) => {
    
    let state: StateObject = getState();
    state.users.push(request.body);
    saveState(state);
    response.status(201).json(request.body);
}

export default {
    health,
    invalid,
    getUsers,
    postUser
};