const db = require('./database.js');

const checkExistingEmailUsername = (username, email) => {
  const { or } = db.connection.Op;
  return db.User.findOne({
    where: {
      [or]: [{ username }, { email }],
    },
  });
};

const checkUsername = username => db.User.findOne({ where: { username } });

const createUser = (username, password, email, name) => db.User.create({
  username,
  password,
  email,
  name,
});

const getUser = id => db.User.findOne({ where: { id } });

const upsertAccountInfo = ({
  city,
  description,
  id,
  imageUrl,
  name,
  password,
  stateName,
  streetAddress,
  username,
  zip,
}) => db.User.upsert({
  city,
  description,
  id,
  imageUrl,
  name,
  password,
  stateName,
  streetAddress,
  username,
  zip,
});

const findUser = username => db.User.findOne({ where: { username } });

exports.checkExistingEmailUsername = checkExistingEmailUsername;
exports.checkUsername = checkUsername;
exports.createUser = createUser;
exports.getUser = getUser;
exports.upsertAccountInfo = upsertAccountInfo;
exports.findUser = findUser;
