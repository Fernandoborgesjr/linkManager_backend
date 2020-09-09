'use-strict';

const { verifyJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
  /* Esse : após a url significa que a variavel está sendo apelidada.
  No presente caso o apelido é "path". */
  const { url: path } = req;

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up'];
  /* A dupla explamação é pra trasformar em booleano. */
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
  if (isExcluded) return next();

  let token = req.headers.authorization;
  token = token ? token.slice(8, token.length) : null;

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
