const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
    router.put('/:id', (req, res) => {
        // Update this single student
        console.log(req.body)
        const sqlText = `UPDATE "inventory"
            SET "name" = $1,
            "image_path" = $2,
            "weight" = $3,
            "speed" = $4, "glide" = $5, "turn" = $6, "fade" = $7,
            "inMyBag" = $8,
            "condition" = $9,
            "notes" = $10,
            "flight_pattern_id" = $11,
            "distance_id" = $12,
            "type_id" = $13
            WHERE id = $14;`;

        const sanitizedValues = [
            req.body.name,
            req.body.image_path,
            req.body.weight,
            req.body.speed,
            req.body.glide,
            req.body.turn,
            req.body.fade,
            req.body.inMyBag,
            req.body.condition,
            req.body.notes,
            req.body.flight_pattern_id,
            req.body.distance_id,
            req.body.type_id,
            req.params.id
        ]

        pool.query(sqlText, sanitizedValues)
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(`Error making database query ${sqlText}`, error);
                res.sendStatus(500);
            });
    });

/**
 * GET Routes
 */
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    const query = `SELECT "inventory".*, "flight_patterns".flight_pattern, "flight_patterns".flight_pattern_image, "distance".distance, "disc_types".type
                      FROM "inventory"
                      JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
                      JOIN "distance" ON "distance".id = "inventory".distance_id
                      JOIN "disc_types" ON "disc_types".id = "inventory".type_id
                      WHERE "inventory".id=$1;`;
    pool
      .query(query, [id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error on in GET disc detail query ${error}`);
        res.sendStatus(500);
      });
  });

module.exports = router;