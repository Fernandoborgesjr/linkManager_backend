/* eslint-disable consistent-return */

'use-strict';

const Joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required(),
};
  /* AbortEarly é para abortar a requisição caso o primeiro item não aprovado
    passar pelo schema. Por padrão esse option é true */

const options = { abortEarly: false };

const accountSignIn = (req, res, next) => {
  const { email, password } = req.body;
  console.log('### accountSignIn middleware', email, password);

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
  });

  const { error } = schema.validate({ email, password }, options);

  if (error) {
    return res.jsonBadRequest(null, null, getValidatorError(error, 'account.signin'));
  }
  next();
};

const accountSignUp = (req, res, next) => {
  const { email, password, passwordConfirmation } = req.body;
  console.log('### accountSignUp middleware', email, password);

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    passwordConfirmation: rules.passwordConfirmation,
  });

  const { error } = schema.validate({ email, password, passwordConfirmation }, options);

  if (error) {
    return res.jsonBadRequest(null, null, getValidatorError(error, 'account.signup'));
  }
  next();
};

module.exports = { accountSignUp, accountSignIn };
