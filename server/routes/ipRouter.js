
const Router = require('express');
const router = new Router();
const ipController = require('../controllers/ipController');
const fileMiddleware = require('../middleware/file');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/:id?', ipController.getIp);
router.put('/:id', checkRoleMiddleware('ADMIN'), ipController.editIp);
router.post('/', fileMiddleware.single('ip'), ipController.setIp);

module.exports = router;
