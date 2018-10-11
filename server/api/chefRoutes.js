const express = require('express');
const dbChefs = require('../../database/chefs.js');

const chefRoutes = express.Router();

// full route is /api/chef/accountInfo
chefRoutes
  .route('/accountInfo')

  .get((req, res) => {
    // console.log('incoming GET /api/chef/accountInfo request is', req);
    dbChefs.getChef(req.query.id)
      .then((accountInfo) => {
        res.status(200).json(accountInfo);
      })
      .catch(console.log);
  })

  .patch((req, res) => {
    dbChefs.upsertAccountInfo(req.body.data).then((created) => {
      if (created) {
        res.status(200);
        res.send('Successfully stored');
      } else {
        res.status(200);
        res.send('Successfully inserted');
      }
    });
  });

module.exports = chefRoutes;
