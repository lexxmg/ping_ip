
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

let users = [
  {id: 1, user: 'admin', password: '1234', role: 'ADMIN'}
];

class UserController {
  async registration(req, res, next) {
    try {
      const {key} = req.query;
      const decoded = jwt.verify(key, config.get('SECRET_KEY'));

      if (!key) {
        return next( ApiError.badRequest('Нет токена') );
      }

      if (decoded) {
        console.log('Регистрация возможна');
      }
    } catch (e) {
      return next( ApiError.badRequest('Токен не действителен') );
    }

    const {user, password, role} = req.body;

    if (!user || !password) {
      return next(ApiError.badRequest('Не корректный логин или пароль'));
    }

    if ( users.find(item => item.user === user) ) {
      return next(ApiError.badRequest('Пользователь существует'));
    }

    const nashPassword = await bcrypt.hash(password, 4);

    let nextId = 0;

    users.forEach((item, i) => {
      if (nextId < item.id) {
        nextId = item.id;
      }
    });

    users = [...users, {id: nextId + 1, user, nashPassword, role}];

    const token = jwt.sign({id: nextId + 1, user, role}, config.get('SECRET_KEY'), {expiresIn: '24h'});

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

  _createMaxId(arr) {
    let max = 0;

    arr.forEach((item, i) => {
      if (max < item.id) {
        max = item.id;
      }
    });

    return max;
  }
}

module.exports = new UserController;
