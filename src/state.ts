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

export function getState () {
    return JSON.parse(fs.readFileSync(statefilePath).toString());
}

export const saveState = (data) => {

    if (!exists()) {
        fs.writeFile(statefilePath, JSON.stringify(defaultObj), function (err) {
            console.log(`State file created at ${statefilePath}`);
        });
    }

    fs.writeFile(statefilePath, JSON.stringify(data), function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
    });
}