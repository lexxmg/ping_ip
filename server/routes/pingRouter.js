
const Router = require('express');
const router = new Router();
const pingController = require('../controllers/pingController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, pingController.ping);

module.exports = router;
