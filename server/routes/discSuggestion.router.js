const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "inventory".*,
                    "flight_patterns".flight_pattern, "flight_patterns".flight_pattern_image, "distance".distance, "disc_types".type
                    FROM "inventory"
                    JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
                        JOIN "distance" ON "distance".id = "inventory".distance_id
                        JOIN "disc_types" ON "disc_types".id = "inventory".type_id
                        WHERE "user_id" = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on in GET suggestion router query ${error}`);
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
