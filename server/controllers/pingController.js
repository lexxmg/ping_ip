
const { exec } = require("child_process");
const ip = require('../../scripts/ip-data');

class PingController {
  async ping(req, res) {
    try {
      let result = [];

      await ip.forEach((item, i) => {
        exec(`ping -c 4 -i 0.2 -W 4 ${item.ip}`, (error, stdout, stderr) => {
          if (error) {
              result = [...result, {...item}];

              if (result.length === ip.length) {
                //success();
                res.json(result);
              }
              return;
          }

          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }

          result = [...result, {...item, description: 'доступен', stat: true}];

          if (result.length === ip.length) {
            res.json(result);
          }
        });
      });
    } catch (e) {
      res.send({message: 'Server error'});
    }
  }
}

module.exports = new PingController;
