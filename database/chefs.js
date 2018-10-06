const db = require('./database.js');

const checkExistingEmailUsername = (username, email) => {
  const { or } = db.connection.Op;
  return db.Chef.findOne({
    where: {
      [or]: [
        { username },
        { email },
      ],
    },
  });
};

const checkUsername = username => db.Chef.findOne({ where: { username } });

const createChef = (username, password, email, name) => db.Chef.create({
  username,
  password,
  email,
  name,
});

const upsertAccountInfo = ({
  // id,
  username,
  streetAddress,
  city,
  stateName,
  zip,
  description,
  imageUrl,
  name,
  password,
}) => db.Chef.upsert({
  // id,
  username,
  streetAddress,
  city,
  stateName,
  zip,
  description,
  imageUrl,
  name,
  password,
});

const findChef = username => db.Chef.findOne({ where: { username } });

exports.checkExistingEmailUsername = checkExistingEmailUsername;
exports.checkUsername = checkUsername;
exports.createChef = createChef;
exports.upsertAccountInfo = upsertAccountInfo;
exports.findChef = findChef;
