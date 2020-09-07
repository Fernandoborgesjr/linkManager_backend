'use-strict';

const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessages } = require('../helpers/messages');
const { generateRefreshJwt, generateJwt } = require('../helpers/jwt');

router.post('/sign-in', accountSignIn, async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });

  const match = account ? bcrypt.compareSync(password, account.password) : null;

  if (!match) return res.jsonBadRequest(null, getMessages('account.signin.invalid'));

  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id });

  return res.jsonOK(account, getMessages('account.signin.success'), { token, refreshToken });
});

/* O accountSignUp está tomando a função de middleware. Aqui ele está sendo passado
de forma indivdual para esta rota. Ele é definido desssa forma porque não precisa
ser passado em um escopo global. */
router.post('/sign-up', accountSignUp, async (req, res) => {
  const { email, password } = req.body;
  if (await Account.findOne({ where: { email } })) {
    return res.jsonBadRequest(null, getMessages('account.signup.email_exists'));
  }
  const newAccount = await Account.create({
    email,
    password: bcrypt.hashSync(password.toString(), 10),
  });

  const token = generateJwt({ id: newAccount.id });
  const refreshToken = generateRefreshJwt({ id: newAccount.id });

  return res.jsonOK(newAccount, getMessages('account.signup.success'), { token, refreshToken });
});

module.exports = router;
