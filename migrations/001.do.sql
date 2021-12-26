
CREATE TABLE IF NOT EXISTS users (
  id varchar(255) NOT NULL,
  email varchar(45) NOT NULL,
  password varchar(255) DEFAULT NULL,
  firstName varchar(45) NOT NULL,
  lastName varchar(45) NOT NULL,
  phone varchar(45) NOT NULL,
  bio varchar(100) DEFAULT NULL,
  admin tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY email_UNIQUE (email),
  UNIQUE KEY phone_UNIQUE (phone)
)