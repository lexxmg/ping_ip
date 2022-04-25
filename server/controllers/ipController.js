
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../storage/ip.json');
//const ip = require('../../scripts/ip-data');
const ip = JSON.parse( loadData(filePath) );

if (0) {
  const ipNew = ip.map((item, i) => {
    return {id: i, ...item, wasActive: {stat: false, date: null}};
  });

  storeData(ipNew, filePath);
}

class IpController {
  async getIp(req, res) {
    res.json(ip);
  }

  async setIp(req, res) {
    //console.log(req);
    if (req.file) {
      res.json({"success": true})
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
