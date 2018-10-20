require('dotenv').config();

const expressJwt = require('express-jwt');
const fs = require('fs');
const axios = require('axios');

const chefs = require('./../database/chefs.js');
const users = require('./../database/users.js');

/* ********* ************************ ********* */
/* ********* PROTECT ROUTES USING JWT ********* */
/* ********* ************************ ********* */

const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY || fs.readFileSync(`${__dirname}/../config/public.key`);

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  // comment out following line if sending Postman requests as cookie is retrieved differently
  getToken: req => req.cookies.SESSIONID,
}).unless({ path: ['/', '/chefauth', '/userauth'] });

/* ********* ************************ ********* */
/* ********* ********* LOGIN ******** ********* */
/* ********* ************************ ********* */
const userLogin = (req, res) => {
  const { username, password } = req.body;

  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/user/login', {
      username,
      password,
    })

    .then(({ data: { authId, token } }) => {
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      return users.findUserByAuthId(authId);
    })

    .then((userRecord) => {
      const { dataValues: { id: userId } } = userRecord;
      return res.status(200).send({ userId });
    })

    .catch(err => console.log(err) || res.status(500).send(err));
};

const login = (req, res) => {
  const { username, password } = req.body;

  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/chef/login', {
      username,
      password,
    })

    .then(({ data: { authId, token } }) => {
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      return chefs.findChefByAuthId(authId);
    })

    .then((chefRecord) => {
      const { dataValues: { id: chefId } } = chefRecord;
      return res.status(200).send({ chefId });
    })

    .catch(err => console.log(err) || res.status(500).send(err));
};

/* ********* ************************ ********* */
/* ********* ******** SIGNUP ******** ********* */
/* ********* ************************ ********* */
const userSignup = (req, res) => {
  const {
    username, password, email, name,
  } = req.body;
  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/user/signup', {
      username,
      password,
      name,
      email,
    })

    .then(({ data: { authId, token } }) => {
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      return users.createUser(username, email, name, authId);
    })

    .then(({ dataValues: { id: userId } }) => res.send({ userId }))

    .catch(err => console.log(err));
};

const signup = (req, res) => {
  const {
    username, password, email, name,
  } = req.body;
  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/chef/signup', {
      username,
      password,
      name,
      email,
    })

    .then(({ data: { authId, token } }) => {
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      return chefs.createChef(username, email, name, authId);
    })

    .then(({ dataValues: { id: chefId } }) => res.send({ chefId }))

    .catch(err => console.log(err));
};

exports.login = login;
exports.userLogin = userLogin;
exports.signup = signup;
exports.userSignup = userSignup;
exports.checkIfAuthenticated = checkIfAuthenticated;
