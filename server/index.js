
const express = require('express');
const https = require('https');
const fs = require('fs');
const config = require('config');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandlingMiddleware');


const key = path.join(__dirname, './sslcert/server.key');
const crt = path.join(__dirname, './sslcert/server.crt');

httpsOptions = {
    key: fs.readFileSync(key), // путь к ключу
    cert: fs.readFileSync(crt) // путь к сертификату
}

const app = express();
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());

//app.use('/#/registration', express.static( path.join(__dirname, '../client/build') ) );

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use('/api', router);

app.use('/', express.static( path.join(__dirname, '../build') ) );


app.use(errorHandler);

const start = () => {
  try {
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
