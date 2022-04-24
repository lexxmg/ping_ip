
const Router = require('express');
const router = new Router();
const getIpController = require('../controllers/getIpController');
const ip = require('../../scripts/ip-data');

router.get('/', getIpController.getIp);

module.exports = router;
