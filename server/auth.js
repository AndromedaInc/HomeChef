require('dotenv').config();
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');

const chefs = require('./../database/chefs.js');
const users = require('./../database/users.js');

/* ********* AUTHENTICATION USING JWT ********* */

const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || fs.readFileSync(`${__dirname}/../config/private.key`);
const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY || fs.readFileSync(`${__dirname}/../config/public.key`);

// To generate token to be placed in cookie
const createJWTBearerToken = user => jwt.sign({}, RSA_PRIVATE_KEY, {
  algorithm: 'RS256',
  expiresIn: 600000, // 10 min is 600000
  subject: user.id.toString(),
});

// To protect routes
const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  // comment out following line if sending Postman requests as cookie is retrieved differently
  getToken: req => req.cookies.SESSIONID,
}).unless({ path: ['/', '/chefauth', '/userauth'] });

/* ********** LOGIN ********** */
const userLogin = (req, res) => {
  const { username, password } = req.body; // needs to be req.query for Postman

  let user;
  if (!username || !password) {
    return res.status(401).send('incomplete fields');
  }
  return users
    .checkUsername(username)

    .then((userRecord) => {
      if (!userRecord) {
        return res.status(400).send('user not found');
      }
      user = userRecord;
      console.log('found record is', user);
      const {
        dataValues: { password: hash },
      } = user;
      console.log('password match boolean is', bcrypt.compare(password, hash));
      return bcrypt.compare(password, hash);
    })

    .then((match) => {
      console.log('match status is', match);
      if (match) {
        return createJWTBearerToken(user);
      }
      throw new Error({ message: 'that password does not match' });
    })

    .then((token) => {
      console.log('weve got a token and are ready to send!', token);
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      const {
        dataValues: { id: userId },
      } = user;
      return res.status(200).send({ userId });
    })

    .catch(err => res.status(401).send(err));
};

const login = (req, res) => {
  console.log('incoming login request is', req);
  const { username, password } = req.body; // needs to be req.query for Postman

  let chef;
  if (!username || !password) {
    return res.status(401).send('incomplete fields');
  }
  return chefs
    .checkUsername(username)

    .then((chefRecord) => {
      if (!chefRecord) {
        return res.status(400).send('user not found');
      }
      chef = chefRecord;
      console.log('found record is', chef);
      const {
        dataValues: { password: hash },
      } = chef;
      console.log('password match boolean is', bcrypt.compare(password, hash));
      return bcrypt.compare(password, hash);
    })

    .then((match) => {
      console.log('match status is', match);
      if (match) {
        return createJWTBearerToken(chef);
      }
      throw new Error({ message: 'that password does not match' });
    })

    .then((token) => {
      console.log('weve got a token and are ready to send!', token);
      res.cookie('SESSIONID', token, { httpOnly: false, secure: false });
      const {
        dataValues: { id: chefId },
      } = chef;
      return res.status(200).send({ chefId });
    })

    .catch(err => res.status(401).send(err));
};

/* ********** SIGNUP ********** */
const userSignup = (req, res) => {
  console.log('incoming signup request is', req);
  const {
    username, password, email, name,
  } = req.body; // needs to be req.query for Postman

  if (!username || !password || !email || !name) {
    return res.status(401).send('incomplete fields');
  }

  return users
    .checkExistingEmailUsername(username, password)

    .then((result) => {
      if (result) {
        return res.status(400).send('that username or email already exists');
      }
      return bcrypt.hash(password, salt);
    })

    .then(hash => users.createUser(username, hash, email, name))

    .then(() => res.send('ok'));
};

const signup = (req, res) => {
  console.log('incoming signup request is', req);
  const {
    username, password, email, name,
  } = req.body; // needs to be req.query for Postman

  if (!username || !password || !email || !name) {
    return res.status(401).send('incomplete fields');
  }

  return chefs
    .checkExistingEmailUsername(username, password)

    .then((result) => {
      if (result) {
        return res.status(400).send('that username or email already exists');
      }
      return bcrypt.hash(password, salt);
    })

    .then(hash => chefs.createChef(username, hash, email, name))

    .then(() => res.send('ok'));
};

exports.login = login;
exports.userLogin = userLogin;
exports.signup = signup;
exports.userSignup = userSignup;
exports.checkIfAuthenticated = checkIfAuthenticated;
