
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../storage/ip.json');

class PingController {
  async ping(req, res) {
    try {
      const formDate = getDate();

      let ip;
      let result = [];

      if ( loadData(filePath) ) {
        ip = JSON.parse( loadData(filePath) );
      } else {
        ip = [];
      }

      await ip.forEach((item, i) => {
        exec(`ping -c 4 -i 0.2 -W 4 ${item.ip}`, (error, stdout, stderr) => {
          if (error) {
              result = [...result, {...item}];

              if (result.length === ip.length) {
                storeData(ip, filePath);
                res.json(result);
              }
              return;
          }

          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }

          result = [...result, {...item, ping: true}];

          item.wasActivePing = true;
          item.wasActiveDate = formDate;

          if (result.length === ip.length) {
            storeData(ip, filePath);
            res.json(result);
          }
        });
      });
    } catch (e) {
      res.send({message: 'Server error'});
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

module.exports = new PingController;
