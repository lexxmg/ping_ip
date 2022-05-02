
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(role) {
  return function(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({message: 'Пользователь не авторизован'});
      }

      const decoded = jwt.verify(token, config.get('SECRET_KEY'));

      if ( Array.isArray(role) ) {
        const result = [];

        role.forEach((item, i) => {
          result.push(decoded.role === item);
        });
        
        if ( !result.some(item => item) ) {
          return res.status(403).json({message: 'Нет доступа'});
        }
      } else {
        if (decoded.role !== role) {
          return res.status(403).json({message: 'Нет доступа'});
        }
      }

      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({message: 'Пользователь не авторизован'});
    }
  }
}
