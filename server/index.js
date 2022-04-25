
const express = require('express');
const config = require('config');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());
app.use('/storage', express.static( path.join(__dirname, 'storage') ) );

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
