'use-strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

// Payload é o corpo/conteúdo do jwt.
const generateJwt = (payload) => jwt.sign(payload, tokenPrivateKey, options);

const verifyJwt = (token) => jwt.verify(token, tokenPrivateKey);

const generateRefreshJwt = (payload) => jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);

const verifyRefreshJwt = (token) => jwt.verify(token, refreshTokenPrivateKey);

const getTokenFromHeader = (header) => {
  const token = header.authorization;
  return token ? token.slice(8, token.length) : null;
};

module.exports = {
  generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeader,
};
