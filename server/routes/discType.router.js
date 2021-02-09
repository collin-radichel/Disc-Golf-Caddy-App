const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
   // return all disc types
   const queryText = `SELECT * FROM disc_types ORDER BY id ASC`;
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