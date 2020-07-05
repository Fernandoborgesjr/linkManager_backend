const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Account } = require('../src/models');

router.get('/sign-in', (req, res) => {
    return res.json('Sign in');
});


router.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;
    if (await Account.findOne({ where: { email } })) return res.json('Account already exists')
    const result = await Account.create({ email, password: bcrypt.hashSync(password.toString(), 10) });
    return res.json(result);
});


module.exports = router;