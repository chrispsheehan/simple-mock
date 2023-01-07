import fs from 'fs';
import * as path from 'path';
import { StateObject } from './stateObject';

const statefile = '../state.json';

const defaultObj = {};

export class StateLoader implements StateObject {

    private statefilePath: string;
    public state: any; // can in theory be anything

    constructor() {

        this.statefilePath = path.join(__dirname, statefile);

        if (!this.exists()) {
            fs.writeFile(this.statefilePath, JSON.stringify(defaultObj), function (err) {
                console.log(`State file created at ${this.statefilePath}`);
            });
        }

        this.state = JSON.parse(fs.readFileSync(this.statefilePath).toString());
    }

    private exists (): boolean {  

        try {
            fs.accessSync(this.statefilePath, fs.constants.F_OK);
            return true;
        } catch(err) {
            console.warn(`Could not find state file at ${this.statefilePath} - have you set permissons?`)
            return false
        }
    }

    public save = () => {
    
        fs.writeFile(this.statefilePath, JSON.stringify(this.state), function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
    }
}