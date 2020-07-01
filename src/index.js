const express = require('express');
const authController = require('../controllers/auth.js');
const app = express();
app.use('/auth', authController)

app.get('/', (req, res) =>{
    return res.json('Api running...')
});















app.listen(3000, ()=>{
    console.log('Listening on port 3000')
});