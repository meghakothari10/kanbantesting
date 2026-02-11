-- migrations/2026-02-11-09-53-31-init.sql

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on email for efficient lookup
CREATE INDEX idx_email ON User(email);

-- Create index on name for efficient lookup
CREATE INDEX idx_name ON User(name);

-- Add validation for email
ALTER TABLE User
ADD CONSTRAINT chk_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

-- Add validation for password
ALTER TABLE User
ADD CONSTRAINT chk_password CHECK (LENGTH(password) >= 8);

-- Create a trigger to update updated_at timestamp on update
DELIMITER $$
CREATE TRIGGER trg_update_updated_at
BEFORE UPDATE ON User
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;