-- CREATE TABLE IF NOT EXISTS pets (
--   id VARCHAR(255) NOT NULL ,
--   type VARCHAR(255) NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   adoptionStatus VARCHAR(255) DEFAULT NULL,
--   picture BLOB NOT NULL,
--   weight SMALLINT DEFAULT NULL,
--   height SMALLINT DEFAULT NULL,
--   color VARCHAR(45) DEFAULT NULL,
--   bio VARCHAR(100) DEFAULT NULL,
--   hypoallergenic TINYINT(1) NOT NULL DEFAULT '0',
--   dietaryRestrictions VARCHAR(45) DEFAULT NULL,
--   breed VARCHAR(45) DEFAULT NULL,
--   owner VARCHAR(255) DEFAULT NULL,
--   PRIMARY KEY (id),
--   UNIQUE KEY id_UNIQUE (id),
--   KEY owner (owner),
--   CONSTRAINT pets_ibfk_1 FOREIGN KEY (owner) REFERENCES users (id)
-- ) 