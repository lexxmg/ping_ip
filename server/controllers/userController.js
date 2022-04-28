
const ApiError = require('../error/apiError');

const users = [
  {id: 1, user: 'lexx', password: '123', role: 'ADMIN'},
  {id: 1, user: 'kati', password: '1234', role: 'USER'}
];

class UserController {
  registration(req, res) {
    res.json({message: 'registration'});
  }

  login(req, res) {
    res.json({message: 'login'});
  }

  check(req, res, next) {
    const {id} = req.query;

    if (!id) {
      return next(ApiError.badRequest('Не задан ID'));
    } else {
      res.json({id: id});
    }
  }
}

module.exports = new UserController;
