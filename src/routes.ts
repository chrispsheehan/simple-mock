import { logRequest } from "./logger";

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

    response.status(201).json({});
}

export default {
    health,
    invalid,
    getUsers,
    postUser
};