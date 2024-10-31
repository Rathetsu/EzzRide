DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  clerk_id varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
CREATE INDEX IF NOT EXISTS users_email_index ON users (email);
CREATE INDEX IF NOT EXISTS users_clerk_id_index ON users (clerk_id);
CREATE INDEX IF NOT EXISTS users_created_at_index ON users (created_at);
CREATE INDEX IF NOT EXISTS users_updated_at_index ON users (updated_at);