const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const newDisc = req.body;
    console.log(req.body)
    const queryText = `INSERT INTO inventory 
                        ("name", "image_path", "weight", "speed", "glide", "turn", "fade",
                            "inMyBag", "condition", "flight_pattern_id", "distance_id", "type_id")
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    const queryValues = [
      newDisc.name,
      newDisc.image_path,
      newDisc.weight,
      newDisc.speed,
      newDisc.glide,
      newDisc.turn,
      newDisc.fade,
      newDisc.inMyBag,
      newDisc.condition,
      newDisc.flight_pattern_id,
      newDisc.distance_id,
      newDisc.type_id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing POST disc query', error);
        res.sendStatus(500);
      });
  });


module.exports = router;