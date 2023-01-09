import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const statefile = process.env.STATE_FILE || '../state.json';

const defaultObj = {};

export class State {

    public data: any; // can in theory be 'anything' (valid json)

    constructor() {

        if (!this.exists()) {
            
            fs.writeFile(statefile, JSON.stringify(defaultObj), function (err) {
                console.log(`State file created at ${this.statefilePath}`);
            });
        }
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

    public get(): any {

        console.info(`Loading state from ${statefile}`)

        let stateFileObject = fs.readFileSync(statefile).toString();

        return this.getState(stateFileObject); // check the json isn't wonky
    }

    public init(): void {

        this.data = this.get(); // load up any pre-existing state
    }

    public save = () => {
        
        console.debug(`Saving state: ${JSON.stringify(this.data)}`);

        fs.writeFile(statefile, JSON.stringify(this.data), function (err) {
            
            if (err) {
                
                console.error(err.message);
                return;
            }
            else {
                
                console.info(`State saved at ${statefile}`);
            }
        });
    }

    public reset = (): void => {

        this.data = defaultObj;
    }
}