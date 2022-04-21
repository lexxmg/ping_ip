
const Router = require('express');
const { exec } = require("child_process");
const ip = require('../../scripts/ip-data');

const router = new Router();

router.get('/ping', async (reg, res) => {
  try {
    let result = [];

    await ip.forEach((item, i) => {
      exec(`ping -c 4 -i 0.2 -W 4 ${item.ip}`, (error, stdout, stderr) => {
        if (error) {
            //console.log(`error: ${error.message}`);
            //console.log(`${item}-не доступен`);
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

        //console.log(`stdout: ${stdout}`);
        //console.log(`${item}-доступен`);
        result = [...result, {...item, description: 'доступен', stat: true}];

        if (result.length === ip.length) {
          //success();
          res.json(result);
        }
      });
    });
  } catch (e) {
    res.send({message: 'Server error'});
  }
});


function success() {
  //console.log(result.length);

  result.sort(function(a, b) {
    const sort = 'id';

    if (a[sort] < b[sort]) return -1;
    if (a[sort] > b[sort]) return 1;

    return 0 // Никакой сортировки
  });

  let j = 0;
  result.forEach((item, i) => {
    if (item.stat) {
      j++;
      console.log(item.ip + ' ' + item.name + '-' + item.description + ' ' + j);
    }
  });

  console.log(Date.now() - time);
}

module.exports = router;
