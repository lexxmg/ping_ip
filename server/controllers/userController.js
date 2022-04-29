
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

let users = [
  {id: 1, user: 'lexx', password: '123', role: 'ADMIN'},
  {id: 2, user: 'kati', password: '1234', role: 'USER'}
];

class UserController {
  async registration(req, res, next) {
    const {user, password, role} = req.body;

    if (!user || !password) {
      return next(ApiError.badRequest('Не корректный логин или пароль'));
    }

    if ( users.find(item => item.user === user) ) {
      return next(ApiError.badRequest('Пользователь существует'));
    }

    const nashPassword = await bcrypt.hash(password, 4);

    users = [...users, {id: 3, user, nashPassword, role}];

    const token = jwt.sign({id: 3, user, role}, config.get('SECRET_KEY'), {expiresIn: '24h'});
    console.log(users);
    res.json(token);
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
