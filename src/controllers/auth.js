'use-strict';

const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp } = require('../validators/account');
const { getMessages } = require('../helpers/messages');

router.get('/sign-in', (req, res) => res.json('Sign in'));

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
  return res.jsonOK(newAccount, getMessages('account.signup.success'));
});

module.exports = router;
