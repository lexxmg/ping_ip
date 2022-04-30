
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
const config = require('config');


class GetRegistrationController {
  async getRegistration(req, res, next) {
    const token = jwt.sign(
      {
        registration: 'registration',
        exp: Math.floor(Date.now() / 1000) + (60 * 5)
      }, config.get('SECRET_KEY'));

    res.json({link: `localhost:5000/api/registration?key=${token}`});
  }
}

module.exports = new GetRegistrationController;
