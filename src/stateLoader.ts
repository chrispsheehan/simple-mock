import fs from 'fs';
import * as dotenv from 'dotenv'
dotenv.config()
import { StateObject } from './stateObject';

const statefile = process.env.STATE_FILE || '../state.json';

const defaultObj = { state: {} };

export class StateLoader implements StateObject {

    public state: any; // can in theory be anything

    constructor() {

        if (!this.exists()) {
            fs.writeFile(statefile, JSON.stringify(defaultObj), function (err) {
                console.log(`State file created at ${this.statefilePath}`);
            });
        }

        this.load();
    }

    private exists (): boolean {  

        try {
            fs.accessSync(statefile, fs.constants.F_OK);
            return true;
        } catch(err) {
            console.warn(`Could not find state file at ${statefile} - have you set permissons?`)
            return false
        }
    }

    getState(stateString: string): any {

        try {

            return JSON.parse(stateString);
            
        } catch (error) {
            
            console.error("COULD NOT PARSE STATE - SETTING TO DEFAULT VALUE");

            return defaultObj;
        }
    }

    public load()  {

        console.info(`Loading state from ${statefile}`)

        let stateFileObject = fs.readFileSync(statefile).toString();

        this.state = this.getState(stateFileObject);
    }

    public save = () => {
    
        fs.writeFile(statefile, JSON.stringify(this.state), function (err) {
            if (err) {
                console.error(err.message);
                return;
            }
            else {
                console.info(`State saved at ${statefile}`);
            }
        });
    }

    public reset = () => {

        this.load();
        this.state = defaultObj;
        this.save();
    }
}