
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
	"user_id" INT REFERENCES "user" NOT NULL,
    "name" VARCHAR (255) NOT NULL,
    "image_path" VARCHAR (255),
    "weight" INT,
    "speed" INT,
    "glide" INT,
    "turn" INT,
    "fade" INT,
    "inMyBag" BOOLEAN NOT NULL,
    "condition" INT NOT NULL,
    "notes" VARCHAR (1000),
    "flight_pattern_id" INT REFERENCES "flight_patterns" NOT NULL,
    "distance_id" INT REFERENCES "distance" NOT NULL,
    "type_id" INT REFERENCES "disc_types" NOT NULL
);

CREATE TABLE "flight_patterns" (
	"id" SERIAL PRIMARY KEY,
	"flight_pattern" VARCHAR (255) NOT NULL,
	"flight_pattern_image" VARCHAR (255) NOT NULL
);

CREATE TABLE "distance" (
	"id" SERIAL PRIMARY KEY,
	"distance" INT NOT NULL
);

CREATE TABLE "disc_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (255) NOT NULL
);


--INSERT INTO flight_patterns
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Over-Stable Hyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Over-Stable Flat') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Over-Stable Anhyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Neutral Hyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Neutral Flat') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Neutral Anhyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Under-Stable Hyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Under-Stable Flat') RETURNING "id", "flight_pattern", "flight_pattern_image";
INSERT INTO "public"."flight_patterns"("flight_pattern") VALUES('Under-Stable Anhyzer') RETURNING "id", "flight_pattern", "flight_pattern_image";


-- Dummy Data for user with id of 2
INSERT INTO "inventory" ("name", "user_id", "image_path", "weight", "speed", "glide", "turn", "fade", "inMyBag", "condition", "notes", "flight_pattern_id", "distance_id", "type_id")

VALUES ('DD Panda', '2', '/images/dd_panda_disc.png', '170', '5', '6', '-1', '1', 'true', '5', 'This disc cuts the wind like butter!  Remember to bring this on windy days', '2', '1', '2'),
('Cheengz', '2', '/images/cheengz_disc.png', '175', '7', '5', '-2', '2', 'true', '7', 'Super fast putter, throw on long straight fairways', '3', '2', '3'),
('Justice', '2', '/images/justice_disc.png', '168', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '4', '3', '4'),
('Deputy', '2', '/images/deputy_disc.png', '171', '3', '4', '0', '2', 'true', '5', 'This disc cuts the wind like butter!  Remember to bring this on windy days', '5', '4', '5'),
('Maverick', '2', '/images/maverick_disc.png', '168', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '6', '5', '6'),
('Harp', '2', '/images/harp_disc.png', '169', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '7', '6', '1'),
('Compass', '2', '/images/compass_disc.png', '160', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '8', '6', '2'),
('Trespass', '2', '/images/trespass_disc.png', '161', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '9', '7', '3'),
('Handeye Deputy', '2', '/images/handeye_deputy_disc.png', '175', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '10', '8', '4'),
('Swan', '2', '/images/swan_disc.png', '176', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '2', '9', '5'),
('Handeye Lucid', '2', '/images/handeye_lucid_disc.png', '180', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '3', '10', '6'),
('Fuzion Maverick', '2', '/images/fuzion_maverick_disc.png', '171', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '4', '11', '1'),
('Deep Love', '2', '/images/deep_love_disc.png', '166', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '5', '12', '2'),
('Molt', '2', '/images/molt_disc.png', '168', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '6', '13', '3'),
('Hyzernauts', '2', '/images/hyzernauts_disc.png', '168', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '7', '14', '4'),
('Sheriff', '2', '/images/sheriff_disc.png', '161', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '8', '15', '5'),
('Mandala', '2', '/images/mandala_disc.png', '172', '5', '6', '0', '1', 'true', '9', 'Horrible in the wind', '9', '16', '6');

--GET request for inventory
SELECT "inventory".name, "inventory".image_path, "inventory".weight, "inventory".speed,
        "inventory".glide, "inventory".turn, "inventory".fade, "inventory".notes,
        "inventory"."inMyBag", "flight_patterns".flight_pattern, "distance".distance, "disc_types".type
FROM "inventory"

JOIN "flight_patterns" ON "flight_patterns".id = "inventory".flight_pattern_id
JOIN "distance" ON "distance".id = "inventory".distance_id
JOIN "disc_types" ON "disc_types".id = "inventory".type_id;