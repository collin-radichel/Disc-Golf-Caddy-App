
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "inventory" (
	"id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "image_path" VARCHAR (255) NOT NULL,
    "weight" INT NOT NULL,
    "speed" INT NOT NULL,
    "glide" INT NOT NULL,
    "turn" INT NOT NULL,
    "fade" INT NOT NULL,
    "inMyBag" BOOLEAN NOT NULL,
    "condition" INT NOT NULL,
    "notes" VARCHAR (1000),
    "flight_pattern_id" INT REFERENCES "flight_patterns" NOT NULL,
    "distance_id" INT REFERENCES "distance" NOT NULL,
    "type_id" INT REFERENCES "disc_types" NOT NULL
);












--GET request for inventory
SELECT "inventory".name, "inventory".image_path, "inventory".weight, "inventory".speed,
        "inventory".glide, "inventory".turn, "inventory".fade, "inventory".notes,
        "inventory"."inMyBag", "flight_patterns".flight_pattern, "distance".distance, "disc_types".type
FROM "inventory"

JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
JOIN "distance" ON "distance".id = "inventory".distance_id
JOIN "disc_types" ON "disc_types".id = "inventory".type_id;