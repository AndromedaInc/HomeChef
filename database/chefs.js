const db = require('./database.js');

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

exports.upsertAccountInfo = upsertAccountInfo;
exports.findChef = findChef;
