
const Router = require('express');
const router = new Router();
const getRegistrationController = require('../controllers/getRegistrationController');

router.get('/get-registration', getRegistrationController.getRegistration);

module.exports = router;
