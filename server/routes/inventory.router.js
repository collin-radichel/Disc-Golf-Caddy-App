const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET routes
 */


router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("req.user", req.user)
  const queryText = `SELECT "inventory".*, "flight_patterns".flight_pattern, "flight_patterns".flight_pattern_image, "distance".distance, "disc_types".type
                        FROM "inventory"
                        JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
                        JOIN "distance" ON "distance".id = "inventory".distance_id
                        JOIN "disc_types" ON "disc_types".id = "inventory".type_id
                        WHERE "user_id" = $1
                        ORDER BY "inventory"."inMyBag" DESC;`;
  pool
    .query(queryText, [req.user.id])
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
router.put("/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id;

  const query = `UPDATE "inventory"
                    SET "inMyBag" = NOT "inMyBag"
                    WHERE id=$1 AND "user_id" = $2;`;
  pool
    .query(query, [id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error completing UPDATE inMyBag", error);
    });
});


// delete a disc
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params);
  const queryText = 'DELETE FROM "inventory" WHERE id=$1 AND "user_id" = $2';
  pool.query(queryText, [req.params.id, req.user.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in favorites router DELETE:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
