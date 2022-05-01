
const ApiError = require('../error/apiError');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const pathUsers = path.join(__dirname, '../storage/users.json');

let users;

if ( loadData(pathUsers) ) {
  users = JSON.parse( loadData(pathUsers) );
} else {
  users = [{id: 1, user: 'admin', password: '1234', role: 'ADMIN'}];
}


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

    users = [...users, {id: nextId + 1, user, nashPassword, role: role ? role : 'USER'}];
    storeData(users, pathUsers);

    const token = generateJwt(nextId + 1, user, role);

    res.json({token});
  }

  login(req, res, next) {
    const {user, password} = req.body;

    const currentUser = users.find(item => item.user === user);
    console.log(currentUser.id);

    if ( !currentUser ) {
      return next(ApiError.internal('Логин или пароль не действителен!'));
    }

    let comparePassword = bcrypt.compareSync(password, currentUser.nashPassword);

    if (!comparePassword) {
      return next(ApiError.internal('Логин или пароль не действителен!'));
    }

    const token = generateJwt(currentUser.id, currentUser.user, currentUser.role);

    res.json({token});
  }

  check(req, res, next) {
    const {id, user, role} = req.user;
    console.log(req.user);
    const token = generateJwt(id, user, role);

    res.json({token});
  }
}

function generateJwt(id, user, role = 'USER') {
  return jwt.sign(
    {
      id: id, user: user, role: role
    },
      config.get('SECRET_KEY'),
    {
      expiresIn: '24h'
    }
  );
}

function storeData(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

function loadData(path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = new UserController;
