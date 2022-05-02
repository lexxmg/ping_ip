
const Router = require('express');
const router = new Router();
const getRegistrationController = require('../controllers/getRegistrationController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/get-registration', checkRoleMiddleware('ADMIN'), getRegistrationController.getRegistration);

module.exports = router;
