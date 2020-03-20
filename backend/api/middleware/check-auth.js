const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = {
  main(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      // const decoded1 = jwtDecode(token);
      // console.log(decoded1.scopes);
      req.userData = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
  },
  scope(scope) {
    return (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwtDecode(token);
      const decodedScopes = decoded.scopes.split(',');
      const scopeArr = scope.split(',');
      if (decodedScopes.indexOf(scopeArr[0]) !== -1) return next();

      return res.status(401).json({
        message: 'Auth failed',
      });
    };
  },
  scopes(scopes) {
    return (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwtDecode(token);
      const decodedScopes = decoded.scopes.split(',');
      const scopesArr = scopes.split(',');
      let count = 0;
      for (let i = 0; i < scopesArr.length; i++) {
        if (decodedScopes.indexOf(scopesArr[i]) !== -1) {
          count += 1;
          if (count === scopesArr.length) { return next(); }
        } else {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
      }
    };
  },
};
