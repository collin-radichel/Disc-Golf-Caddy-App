const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/types', (req, res) => {
   // return all disc types
   const queryText = `SELECT * FROM disc_types ORDER BY id ASC;`;
   pool
     .query(queryText)
     .then((result) => {
       res.send(result.rows);
     })
     .catch((error) => {
       console.log(`Error on query ${error}`);
       res.sendStatus(500);
     });
});

router.get('/distances', (req, res) => {
  // return all disc distances
  const queryText = `SELECT * FROM distance ORDER BY id ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.get('/flightPatterns', (req, res) => {
  // return all disc flightPatterns
  const queryText = `SELECT * FROM flight_patterns ORDER BY id ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;