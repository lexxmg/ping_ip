
const Router = require('express');
const router = new Router();
const ipController = require('../controllers/ipController');
const fileMiddleware = require('../middleware/file');

router.get('/:id?', ipController.getIp);
router.put('/:id', ipController.editIp);
router.post('/', fileMiddleware.single('ip'), ipController.setIp);

module.exports = router;
