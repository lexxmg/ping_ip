
const Router = require('express');
const router = new Router();
const ip = require('../ip.json');

router.get('/', (req, res) => {
  res.json(ip);
});

module.exports = router;
