
const Router = require('express');
const router = new Router();
const ipController = require('../controllers/ipController');
const fileMiddleware = require('../middleware/file');
const ip = require('../../scripts/ip-data');

//fileMiddleware.single('ip'),

router.get('/', ipController.getIp);
router.post('/', fileMiddleware.single('ip'), ipController.setIp);

module.exports = router;
