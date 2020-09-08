'use-strict';

const { verifyJwt } = require('../helpers/jwt');

// eslint-disable-next-line consistent-return
const checkJwt = (req, res, next) => {
  let token = req.headers.authorization;
  token = token ? token.slice(8, token.length) : null;

  if (!token) {
    return res.jsonUnauthorized(null, 'Invalid token here.');
  }

  try {
    const decoded = verifyJwt(token);

    req.accountId = decoded.id;
    next();
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token here.');
  }
};

module.exports = { checkJwt };
