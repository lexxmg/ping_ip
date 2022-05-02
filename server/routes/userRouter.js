
const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const fileMiddleware = require('../middleware/file');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/user', checkRoleMiddleware('ADMIN'), userController.getUser);
router.put('/user', checkRoleMiddleware('ADMIN'), userController.editUser);
router.delete('/user/:id', checkRoleMiddleware('ADMIN'), userController.deleteUser);

module.exports = router;
