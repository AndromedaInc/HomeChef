const db = require('./database.js');

const upsertAccountInfo = ({
  username,
  address, // replace with values below once able to drop and resync db with Sarah
  // streetAddress,
  // city,
  // state,
  // zip,
  description,
}) => (db.Chef.upsert({
  username,
  address, // replace with values below once able to drop and resync db with Sarah
  // streetAddress,
  // city,
  // state,
  // zip,
  description,
}));

exports.upsertAccountInfo = upsertAccountInfo;
