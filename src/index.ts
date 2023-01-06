import fs from 'fs';
import express from 'express';
import https from 'https';
import http from 'http';

import routes from './routes';

const LOCAL_PORT = 2000;
const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;
const MOCK_REFERENCE = 'Mocky'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Hello from ${MOCK_REFERENCE} Mock!`);
});

app.get('/health', (req, res) => { 
  routes.health(req, res);
});

///////////// VALID ROUTES ///////////////

app.post('/users', (req, res) => { 
  routes.postUser(req, res);
});

app.get('/users', (req, res) => { 
  routes.getUsers(req, res);
});

/////// END OF VALID ROUTES //////

// log out invalid requests
app.get('/*', function(req, res) {
  routes.invalid(req, res);
});

app.listen(LOCAL_PORT, () =>
  console.log(`${MOCK_REFERENCE} mock up and running!`),
);

// Handle http requests
var httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT);

const certsFolder = '/dist/certs'
const keyfile = `${certsFolder}/tls.key`; // mount the certs to allow https
const certfile = `${certsFolder}/tls.crt`;

if (fs.existsSync(keyfile)) {
  
  var privateKey  = fs.readFileSync(keyfile, 'utf8');
  var certificate = fs.readFileSync(certfile, 'utf8');
  
  var credentials = {key: privateKey, cert: certificate};

  var httpsServer = https.createServer(credentials, app);

  httpsServer.listen(HTTPS_PORT);
}
else {
  console.error('!!!COULD NOT FIND KEY/CRT FILES - THIS IS FINE FOR LOCAL DEV!!!')
}