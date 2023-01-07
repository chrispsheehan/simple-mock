import fs from 'fs';
import * as path from 'path';
import { StateObject } from 'stateObject';

const statefile = '../state.json';

const defaultObj = {};

export class State {

    private statefilePath: string;

    constructor() {

        this.statefilePath = path.join(__dirname, statefile);

        if (!this.exists()) {
            fs.writeFile(this.statefilePath, JSON.stringify(defaultObj), function (err) {
                console.log(`State file created at ${this.statefilePath}`);
            });
        }
    }

    exists (): boolean {  

        try {
            fs.accessSync(this.statefilePath, fs.constants.F_OK);
            return true;
        } catch(err) {
            console.warn(`Could not find state file at ${this.statefilePath} - have you set permissons?`)
            return false
        }
    }

    save = (data: StateObject) => {
    
        fs.writeFile(this.statefilePath, JSON.stringify(data), function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
    }

    get (): StateObject {
        
        return JSON.parse(fs.readFileSync(this.statefilePath).toString());
    }
}