const express = require('express');
require('dotenv').config();
// const bodyparser = require('body-parser');

const app = express();
// const db = require('./../database/database.js');

const port = process.env.PORT || 5678;

app.use(express.static(`${__dirname}/../dist`));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
