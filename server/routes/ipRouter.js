
const Router = require('express');
const router = new Router();
const ipController = require('../controllers/ipController');
const fileMiddleware = require('../middleware/file');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id?', authMiddleware, ipController.getIp);
router.put('/:id', checkRoleMiddleware(['ADMIN', 'MANAGER']), ipController.editIp);
router.post('/', checkRoleMiddleware('ADMIN'), fileMiddleware.single('ip'), ipController.setIp);

module.exports = router;
