const express = require('express');
// const bodyparser = require('body-parser');

const app = express();
const db = require('./../database/database.js');

const port = process.env.PORT || 5678;

app.use(express.static(`${__dirname}/../dist`));

// Test Database:
app.post('/test', (req, res) => {
  db.Chef.create({ name: 'sarah silva', username: 'chefsarah' });
  console.log('creating chef');
  res.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
