CREATE TABLE IF NOT EXISTS saved (
  id int NOT NULL AUTO_INCREMENT,
  userId varchar(255) DEFAULT NULL,
  petId varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  KEY userId (userId),
  KEY petId (petId),
  CONSTRAINT saved_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id),
  CONSTRAINT saved_ibfk_2 FOREIGN KEY (petId) REFERENCES pets (id)
)