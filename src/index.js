'use-strict';

const express = require('express');
const authController = require('./controllers/auth.js');
const linkController = require('./controllers/link.js');

const app = express();
const db = require('./models');
const resMid = require('./middlewares/response');

app.use(resMid);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);
app.use('/link', linkController);

app.get('/', (req, res) => res.json('Api running...'));

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('####### Listening on port 3000 ####### \n\n\n\n\n\n\n');
  });
});
