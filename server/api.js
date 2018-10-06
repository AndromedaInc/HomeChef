const express = require('express');
const chefRoutes = require('./api/chefRoutes.js');
// const user = require('./api/users');

const api = express.Router();

api.use('/chef', (req, res, next) => console.log('within api.js and chefRoutes is', chefRoutes) || next(), chefRoutes);
// api.use('/user', user);

module.exports = api;
