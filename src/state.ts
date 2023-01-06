import fs from 'fs';
import * as path from 'path';

const statefile = '../state.json';

const statefilePath = path.join(__dirname, statefile);
const defaultObj = {};

function exists () {  

    try {
        fs.accessSync(statefilePath, fs.constants.F_OK);
        return true;
    } catch(err) {   
        return false
    }
}

function getState () {
    return JSON.parse(fs.readFileSync(statefilePath).toString());
}

export const saveState = (data) => {

    if (!exists()) {
        fs.writeFile(statefilePath, JSON.stringify(defaultObj), function (err) {
            console.log(`State file created at ${statefilePath}`);
        });
    }

    let state = getState();

    console.log('data' + JSON.stringify(data));
    console.log('state' + JSON.stringify(state));
    let combined = {...state, ...data}
    console.log('com'+ JSON.stringify(combined));

    fs.writeFile(statefilePath, JSON.stringify({...state, ...data}), function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
    });
}

