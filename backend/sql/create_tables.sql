-- This script is written for PostgreSQL

-- Add ENUM type for asset_type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'asset_type_enum') THEN
    CREATE TYPE asset_type_enum AS ENUM ('2 Wheeler', '3 Wheeler', '4 Wheeler', 'Other');
  END IF;
END$$;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(50),
  asset_type asset_type_enum, -- Now uses ENUM for dropdown values
  asset VARCHAR(100),
  bank_name VARCHAR(100),
  serial_number VARCHAR(100) UNIQUE,
  entry_datetime TIMESTAMP,
  borrower_name VARCHAR(100),
  engine_number VARCHAR(100),
  chassis_number VARCHAR(100),
  mileage VARCHAR(50),
  condition TEXT,
  description TEXT,

  -- Inventory fields (common Yes/No fields for all types, nullable if not applicable)
  registration_book BOOLEAN,
  insurance_certificate BOOLEAN,
  guarantees_manual_nook BOOLEAN,
  asset_key BOOLEAN,
  wheeler_spanner BOOLEAN,
  battery BOOLEAN,
  side_mirror_right BOOLEAN,
  side_mirror_left BOOLEAN,

  -- 2 wheeler specific
  front_tyre VARCHAR(50),
  rear_tyre VARCHAR(50),

  -- 4 wheeler specific
  music_system BOOLEAN,
  speakers BOOLEAN,
  stephney BOOLEAN,
  jackey BOOLEAN,
  jackey_rod BOOLEAN,
  wiper BOOLEAN,
  toolkit BOOLEAN,
  rear_view_mirror BOOLEAN,
  rope BOOLEAN,
  tarpaulin BOOLEAN,
  air_condition BOOLEAN,
  front_right_tyre VARCHAR(50),
  front_left_tyre VARCHAR(50),
  rear_right_tyre VARCHAR(50),
  rear_left_tyre VARCHAR(50),

  -- Common
  body_condition TEXT,
  other_description TEXT,
  possession_agency VARCHAR(100),
  possession_agency_contact VARCHAR(50),
  collector_name VARCHAR(100),
  collector_signature TEXT,

  exit_datetime TIMESTAMP
);
