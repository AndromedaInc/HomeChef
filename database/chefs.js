const db = require('./database.js');

const checkExistingEmailUsername = (username, email) => {
  const { or } = db.connection.Op;
  return db.Chef.findOne({
    where: {
      [or]: [{ username }, { email }],
    },
  });
};

const checkUsername = username => db.Chef.findOne({ where: { username } });

const createChef = (username, email, name, authId) => db.Chef.create({
  username,
  email,
  name,
  authId,
});

const getChef = id => db.Chef.findOne({ where: { id } });

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
}) => db.Chef.upsert({
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

const findChef = username => db.Chef.findOne({ where: { username } });

const findChefByAuthId = authId => db.Chef.findOne({ where: { authId } });

exports.checkExistingEmailUsername = checkExistingEmailUsername;
exports.checkUsername = checkUsername;
exports.createChef = createChef;
exports.getChef = getChef;
exports.upsertAccountInfo = upsertAccountInfo;
exports.findChef = findChef;
exports.findChefByAuthId = findChefByAuthId;
