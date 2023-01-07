import fs from 'fs';
import * as path from 'path';
import { StateObject } from 'stateObject';

const statefile = '../state.json';

const statefilePath = path.join(__dirname, statefile);
const defaultObj = {};

function exists () {  

    try {
        fs.accessSync(statefilePath, fs.constants.F_OK);
        return true;
    } catch(err) {
        console.warn(`Could not find state file at ${statefilePath} - have you set permissons?`)
        return false
    }
}

export function getState () {
    return JSON.parse(fs.readFileSync(statefilePath).toString());
}

export const saveState = (data: StateObject) => {

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