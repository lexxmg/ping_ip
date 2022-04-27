
const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');

const filePath = path.join(__dirname, '../storage/ip.json');
const pathCsvFile = path.join(__dirname, '../storage/ip.csv');

let ip;

if ( loadData(filePath) ) {
  ip = JSON.parse( loadData(filePath) );
} else {
  ip = [];
}


class IpController {
  async getIp(req, res) {
    if (req.params.id) {
      res.json( ip.find(item => item.id == req.params.id) );
    } else {
      res.json(ip);
    }
  }

  async editIp(req, res) {
    if (!req.body) return res.sendStatus(400);

    const id = req.params.id;
    const sw = req.body.sw || null;
    const port = req.body.port || null;
    const speed = req.body.speed || '100-kb/s';
    const office = req.body.office || null;
    const name = req.body.name || null;
    const active = req.body.active || false;

    const ipNew = ip.map(item => {
      if (item.id == id) {
        return {...item, sw, port, speed, office, name, active}
      }

      return item;
    });

    await storeData(ipNew, filePath);

    res.json( ipNew[id - 1] );
  }

  async setIp(req, res) {
    const result = [];
    if (req.file) {
      //await csvToJson.generateJsonFileFromCsv(pathCsvFile, filePath);

      const newArr = csvToJson.getJsonFromCsv(pathCsvFile).map((item, i) => {
        if (item.sw === 'null') item.sw = null;
        if (item.port === 'null') item.port = null;
        if (item.office === 'null') item.office = null;
        if (item.active === 'false') item.active = false;
        if (item.active === 'true') item.active = true;
        if (item.ping === 'false') item.ping = false;
        if (item.ping === 'true') item.ping = true;
        if (item.wasActivePing === 'false') item.wasActivePing = false;
        if (item.wasActivePing === 'true') item.wasActivePing = true;
        if (item.wasActiveDate === 'null') item.wasActiveDate = null;

        return item;
      });

      await storeData(newArr, filePath);

      res.json( JSON.parse( loadData(filePath) ) );
    }
  }
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

module.exports = new IpController;
