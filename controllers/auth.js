const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Account } = require('../src/models');

router.get('/sign-in', (req, res) => {
    return res.json('Sign in');
});


router.get('/sign-up', async (req, res) => {
    const email = 'fernandoborgesj8r@outlook.com';
    const password = '123456';
    const result = await Account.create({ email, password: bcrypt.hashSync(password, 10) });
    console.log(result);
    return res.json(result);
});


module.exports = router;