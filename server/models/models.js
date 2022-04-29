
const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');

const pathJsonFile = path.join(__dirname, '../storage/ip.json');
const pathCsvFile = path.join(__dirname, '../storage/ip.csv');

let ip;

if ( loadData(pathJsonFile) ) {
  ip = JSON.parse( loadData(pathJsonFile) );
} else {
  ip = [];
}

const getIp = () => {
  
}

function storeData(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

function loadData(path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = {}
