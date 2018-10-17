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

  console.log('inside login and about to axios.post with this username', username, 'and this password', password);

  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/user/login', {
      username,
      password,
    })
    .then((response) => {
      const {
        data: { authId },
      } = response;
      // console.log('authId is', authId);
      return users.findUserByAuthId(authId);
    })
    .then((userRecord) => {
      // console.log('userRecord is', userRecord);
      const { dataValues: { id: userId } } = userRecord;
      // console.log('userId is', userId);
      return res.status(200).send({ userId });
    })

    .catch(err => console.log(err));
};

const login = (req, res) => {
  const { username, password } = req.body;

  console.log('inside login and about to axios.post with this username', username, 'and this password', password);

  axios
    .post('https://andromeda-chef-authentication.herokuapp.com/api/chef/login', {
      username,
      password,
    })
    .then((response) => {
      console.log('cookie is', response.headers['set-cookie'][0]);
      const {
        data: { authId },
      } = response;
      // console.log('authId is', authId);
      return chefs.findChefByAuthId(authId);
    })
    .then((chefRecord) => {
      // console.log('chefRecord is', chefRecord);
      const { dataValues: { id: chefId } } = chefRecord;
      // console.log('chefId is', chefId);
      return res.status(200).send({ chefId });
    })

    .catch(err => console.log(err));
};

/* ********* ************************ ********* */
/* ********* ******** SIGNUP ******** ********* */
/* ********* ************************ ********* */
const userSignup = (req, res) => {
  console.log('incoming signup request is', req);
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

    .then(({ data: { authId } }) => console.log('received authId as', authId) || users.createUser(username, email, name, authId))

    .then(({ dataValues: { id: userId } }) => console.log('got userId as', userId) || res.send({ userId }))

    .catch(err => console.log(err));
};

const signup = (req, res) => {
  console.log('incoming signup request is', req);
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

    .then(({ data: { authId } }) => console.log('received authId as', authId) || chefs.createChef(username, email, name, authId))

    .then(({ dataValues: { id: chefId } }) => console.log('got chefId as', chefId) || res.send({ chefId }))

    .catch(err => console.log(err));
};

exports.login = login;
exports.userLogin = userLogin;
exports.signup = signup;
exports.userSignup = userSignup;
exports.checkIfAuthenticated = checkIfAuthenticated;
