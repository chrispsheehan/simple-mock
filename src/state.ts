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


export const saveState = (data: object) => {

    if (!exists()) {
        fs.writeFile(statefilePath, JSON.stringify(defaultObj), function (err) {
            console.log(`State file created at ${statefilePath}`);
        });
    }

    // fs.writeFile(statefile, JSON.stringify(data), function (err) {
    //     if (err) {
    //       console.log('There has been an error saving your configuration data.');
    //       console.log(err.message);
    //       return;
    //     }
    //     console.log('Configuration saved successfully.')
    // });
}

