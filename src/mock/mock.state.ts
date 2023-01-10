import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const statefile = process.env.STATE_FILE;

const defaultObj = {};

export class State {

    public data: any; // can in theory be 'anything' (valid json)

    constructor() {

        if(statefile) {

            if(!this.exists()) {

                fs.writeFile(statefile, JSON.stringify(defaultObj), function (err) {
                    
                    if(err) throw new Error(`Could not create state file at ${statefile}\n${err.message}`);
                    
                    console.log(`State file created at ${statefile}`);
                });
            }
        }
        else {
            
            throw new Error("\n***STATE_FILE environment variable not spcified.***\n");
        }
    }

    getState(stateString: string): any {

        try {

            return JSON.parse(stateString);
            
        } catch (error) {
            
            console.warn("COULD NOT PARSE STATE - SETTING TO DEFAULT VALUE");

            return defaultObj;
        }
    }

    private exists (): boolean {  

        try {
            
            fs.accessSync(statefile, fs.constants.F_OK);
            return true;
        } catch(err) {

            return false
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
        
        fs.writeFile(statefile, JSON.stringify(this.data), function (err) {
            
            if (err) {
                
                console.error(err.message);
                return;
            }
        });
    }

    public reset = (): void => {

        this.data = defaultObj;
    }
}