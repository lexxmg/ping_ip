
const express = require('express');
const config = require('config');
const router = require('./routes/ping.routes.js');


const app = express();
const PORT = config.get('serverPort');

app.use('/api', router);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
