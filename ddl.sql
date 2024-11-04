------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
-- `users` table
------------------------------------------------------------------------------------------------

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

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
-- `drivers` table
------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS drivers;
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  profile_image_url TEXT,
  car_image_url TEXT,
  car_seats INTEGER NOT NULL CHECK (car_seats > 0),
  rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
CREATE INDEX IF NOT EXISTS drivers_first_name_index ON drivers (first_name);
CREATE INDEX IF NOT EXISTS drivers_last_name_index ON drivers (last_name);
CREATE INDEX IF NOT EXISTS drivers_car_seats_index ON drivers (car_seats);
CREATE INDEX IF NOT EXISTS drivers_rating_index ON drivers (rating);
CREATE INDEX IF NOT EXISTS drivers_created_at_index ON drivers (created_at);
CREATE INDEX IF NOT EXISTS drivers_updated_at_index ON drivers (updated_at);

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
-- `rides` table
------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS rides;
CREATE TABLE IF NOT EXISTS rides (
  ride_id SERIAL PRIMARY KEY,
  origin_address varchar(255) NOT NULL,
  destination_address varchar(255) NOT NULL,
  origin_latitude DECIMAL(9, 6) NOT NULL,
  origin_longitude DECIMAL(9, 6) NOT NULL,
  destination_latitude DECIMAL(9, 6) NOT NULL,
  destination_longitude DECIMAL(9, 6) NOT NULL,
  ride_time INTEGER NOT NULL,
  fare_price DECIMAL(10, 2) NOT NULL CHECK (fare_price >= 0),
  payment_status varchar(20) NOT NULL,
  driver_id INTEGER REFERENCES drivers(id),
  user_id varchar(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
CREATE INDEX IF NOT EXISTS rides_origin_address_index ON rides (origin_address);
CREATE INDEX IF NOT EXISTS rides_destination_address_index ON rides (destination_address);
CREATE INDEX IF NOT EXISTS rides_ride_time_index ON rides (ride_time);
CREATE INDEX IF NOT EXISTS rides_fare_price_index ON rides (fare_price);
CREATE INDEX IF NOT EXISTS rides_payment_status_index ON rides (payment_status);
CREATE INDEX IF NOT EXISTS rides_driver_id_index ON rides (driver_id);
CREATE INDEX IF NOT EXISTS rides_user_id_index ON rides (user_id);
CREATE INDEX IF NOT EXISTS rides_created_at_index ON rides (created_at);
CREATE INDEX IF NOT EXISTS rides_updated_at_index ON rides (updated_at);

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
-- Function and triggers to update updated_at column on all tables when a row is updated
------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at
BEFORE UPDATE ON drivers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rides_updated_at
BEFORE UPDATE ON rides
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------