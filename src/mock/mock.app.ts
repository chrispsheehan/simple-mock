import fs from 'fs';
import express, { Request, Response } from 'express';
import https from 'https';
import http from 'http';
import * as dotenv from 'dotenv'
import onFinished from 'on-finished';

import { State } from './mock.state';
dotenv.config()

const HTTP_PORT = 8080; // standard port
const HTTPS_PORT = 8443; // standard port

const LOCAL_PORT = process.env.LOCAL_PORT || 2000;
const MOCK_REFERENCE = process.env.MOCK_REFERENCE || 'ADD_DOTENV_FILE_TO_SET_MOCK_REFERENCE';
const HTTPS_MODE = process.env.HTTPS_MODE === "true" || false; // workaround to resolve boolean

declare global {
  var state: State
}

export function mock (): express.Application {

    const app = express();
    global.state = new State();
    global.state.init();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req: Request, res: Response, next) => { 
      console.log(`Params: ${JSON.stringify(req.params)}`); // log out requests
      console.log(`Headers: ${JSON.stringify(req.headers)}`);
      console.log(`${req.method}: ${JSON.stringify(req.url)}`);
      onFinished(res, function () {
        global.state.save(); // save state after each request
        // log out invalid requests
        app.all('/*', function(req: Request, res: Response) {
          console.error(`***ROUTE NOT SUPPORTED***\n`);
          res.status(404).json({message: "invalidRoute"})
        });
      })
      next();
    })
    
    app.get('/', (req: Request, res: Response) => {
      res.send(`Hello from ${MOCK_REFERENCE} Mock!`);  
    });

    app.get('/health', (req: Request, res: Response) => { 
      res.json({health: 'OK'});
    });
    
    app.delete('/mock/state', (req: Request, res: Response) => { 
      global.state.reset();
      res.status(204).json({});
    });
    
    app.get('/mock/state', (req: Request, res: Response) => { 
      res.status(200).json(global.state.data);
    });

    /// Serves basic localhost site
    var httpServer = http.createServer(app);
    httpServer.listen(HTTP_PORT);

    app.listen(LOCAL_PORT, () => {
      console.log(`${MOCK_REFERENCE} mock up and running!`);
    });

    /////// START OF HTTPS CONFIG //////
    if(HTTPS_MODE) { // stop some noise locally

        const certsFolder = '/dist/certs'; // mount cert files to this folder
        const keyfile = `${certsFolder}/tls.key`; // most likely saved as a secret somewhere
        const certfile = `${certsFolder}/tls.crt`; // same for this
        
        if (fs.existsSync(keyfile)) {
            
            var privateKey  = fs.readFileSync(keyfile, 'utf8');
            var certificate = fs.readFileSync(certfile, 'utf8');        
            var credentials = { key: privateKey, cert: certificate };
            var httpsServer = https.createServer(credentials, app);
            httpsServer.listen(HTTPS_PORT);
        }
        else {

            console.error('!!!COULD NOT FIND KEY/CRT FILES - THIS IS FINE FOR LOCAL DEV!!!')
        }
    }

    return app;
}