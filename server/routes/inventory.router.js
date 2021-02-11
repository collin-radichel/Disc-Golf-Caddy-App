const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET routes
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log('id', id)
  const query = `SELECT "inventory".*, "flight_patterns".flight_pattern, "distance".distance, "disc_types".type
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
      console.log(`Error on in GET disc detail inventory.router query ${error}`);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const queryText = `SELECT "inventory".*, "flight_patterns".flight_pattern, "distance".distance, "disc_types".type
                        FROM "inventory"
                        JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
                        JOIN "distance" ON "distance".id = "inventory".distance_id
                        JOIN "disc_types" ON "disc_types".id = "inventory".type_id
                        ORDER BY "inventory"."inMyBag" DESC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on in GET inventory router query ${error}`);
      res.sendStatus(500);
    });
});

/**
 * PUT routes
 */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const query = `UPDATE "inventory"
                    SET "inMyBag" = NOT "inMyBag"
                    WHERE id=$1;`;

  pool
    .query(query, [id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error completing UPDATE inMyBag", error);
    });
});

module.exports = router;
