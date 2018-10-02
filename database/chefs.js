const db = require('./database.js');

const upsertAccountInfo = ({
  username,
  streetAddress,
  city,
  stateName,
  zip,
  description,
  imageUrl,
  name,
  password,
}) => (db.Chef.upsert({
  username,
  streetAddress,
  city,
  stateName,
  zip,
  description,
  imageUrl,
  name,
  password,
}));

exports.upsertAccountInfo = upsertAccountInfo;
