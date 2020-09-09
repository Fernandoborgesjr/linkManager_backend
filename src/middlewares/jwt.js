'use-strict';

const { verifyJwt, getTokenFromHeader } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
  /* Esse : após a url significa que a variavel está sendo apelidada.
  No presente caso o apelido é "path". */
  const { url: path } = req;

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh'];
  /* A dupla explamação é pra trasformar em booleano. */
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
  if (isExcluded) return next();

  const token = getTokenFromHeader(req.headers);

  if (!token) {
    return res.jsonUnauthorized(null, 'Invalid token here.');
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.id;
    return next();
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token here.');
  }
};

module.exports = { checkJwt };
