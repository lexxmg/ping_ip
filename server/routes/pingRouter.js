
const Router = require('express');
const router = new Router();
const pingController = require('../controllers/pingController');

router.get('/', pingController.ping);

module.exports = router;
