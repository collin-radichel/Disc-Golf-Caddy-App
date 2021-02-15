const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated,  (req, res) => {
    const newDisc = req.body;
    console.log(req.body)
    const queryText = `INSERT INTO inventory 
                        ("name", "user_id", "image_path", "weight", "speed", "glide", "turn", "fade",
                            "inMyBag", "condition", "notes", "flight_pattern_id", "distance_id", "type_id")
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
    const queryValues = [
      newDisc.name,
      req.user.id,
      newDisc.image_path,
      newDisc.weight,
      newDisc.speed,
      newDisc.glide,
      newDisc.turn,
      newDisc.fade,
      newDisc.inMyBag,
      newDisc.condition,
      newDisc.notes,
      newDisc.flightPattern_id,
      newDisc.discDistance_id,
      newDisc.discType_id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing POST disc query', error);
        res.sendStatus(500);
      });
  });


module.exports = router;