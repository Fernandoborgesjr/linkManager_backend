'use-strict';

const express = require('express');
const cors = require('cors');
const authController = require('./controllers/auth.js');
const linkController = require('./controllers/link.js');

const app = express();
const db = require('./models');
const resMid = require('./middlewares/response');
const { checkJwt } = require('./middlewares/jwt');

/* Cors */
app.use(cors());

/* Middlewares */
app.use(resMid, checkJwt);

/* Express configurations */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Controllers */
app.use('/auth', authController);
app.use('/link', linkController);

/* Base */
app.get('/', (req, res) => res.json('Api running...'));

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('####### Listening on port 3001 ####### \n\n\n\n\n\n\n');
  });
});
