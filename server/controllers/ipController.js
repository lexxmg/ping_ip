
const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');

const filePath = path.join(__dirname, '../storage/ip.json');
const pathCsvFile = path.join(__dirname, '../storage/ip.csv');

class IpController {
  async getIp(req, res) {
    const ip = getIpStor();

    if (req.params.id) {
      res.json( ip.find(item => item.id == req.params.id) );
    } else {
      res.json(ip);
    }
  }

  async editIp(req, res) {
    if (!req.body) return res.sendStatus(400);

    const formDate = getDate();

    const ip = getIpStor();

    let port = null;

    if (req.body.port) {
      port = +req.body.port;
    }

    const id = req.params.id;
    const sw = req.body.sw;
    //const port = req.body.port || null;
    const speed = req.body.speed || '100-kb/s';
    const office = req.body.office || null;
    const name = req.body.name;
    const active = req.body.active;

    const ipNew = ip.map(item => {
      if (item.id == id) {
        return {...item, sw: sw, port, speed, office, name, active,
          wasActivePing: false,
          wasActiveDate: null,
          manager: req.user.user, dateEdit: formDate
        }
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
        if (item.port === 'null') {
          item.port = null;
        } else {
          item.port = +item.port;
        }
        if (item.office === 'null') item.office = null;
        if (item.active === 'false') item.active = false;
        if (item.active === 'true') item.active = true;
        if (item.ping === 'false') item.ping = false;
        if (item.ping === 'true') item.ping = true;
        if (item.wasActivePing === 'false') item.wasActivePing = false;
        if (item.wasActivePing === 'true') item.wasActivePing = true;
        if (item.wasActiveDate === 'null') item.wasActiveDate = null;
        if (item.manager === 'null') item.manager = null;
        if (item.dateEdit === 'null') item.dateEdit = null;
        item.id = +item.id;

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

function getIpStor() {
  let ip;

  if ( loadData(filePath) ) {
    ip = JSON.parse( loadData(filePath) );
  } else {
    ip = [];
  }

  return ip;
}

function getDate() {
  const date = new Date();
  const day = (date.getDate() >= 10) ? date.getDate() : '0' + date.getDate();
  const month = (date.getMonth() >= 9) ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = (date.getHours() >= 10) ? date.getHours() : '0' + date.getHours();
  const minutes = (date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes();
  const seconds = (date.getSeconds() >= 10) ? date.getSeconds() : '0' + date.getSeconds();

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = new IpController;
