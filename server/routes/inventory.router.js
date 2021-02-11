const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // return all disc distances
  const queryText =
  
    `SELECT "inventory".name, "inventory".image_path, "inventory".weight, "inventory".speed,
        "inventory".glide, "inventory".turn, "inventory".fade, "inventory".notes,
        "inventory"."inMyBag", "flight_patterns".flight_pattern, "distance".distance, "disc_types".type
            FROM "inventory"
                JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
                JOIN "distance" ON "distance".id = "inventory".distance_id
                JOIN "disc_types" ON "disc_types".id = "inventory".type_id;`;
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
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
