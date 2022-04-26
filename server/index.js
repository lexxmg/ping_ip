
const express = require('express');
const config = require('config');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = config.get('serverPort');

const middleware = (req, res, next) => {
  console.log(req.path);
  console.log(req.method);
  console.log(req.body.data);

  next();
}

const middlewareTwo = (req, res, next) => {
  console.log('middlewareTwo');

  //next();
}

app.use(cors());
app.use(express.json());
app.use('/storage', express.static( path.join(__dirname, 'storage') ) );

app.use('/api',middleware, middlewareTwo, router);

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
