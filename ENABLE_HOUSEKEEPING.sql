-- Quick setup to enable Housekeeping module

-- Step 1: Add feature flag columns (if not exists)
ALTER TABLE restaurant_tbl
ADD COLUMN IF NOT EXISTS enable_steward TINYINT(1) DEFAULT 1 COMMENT 'Enable Steward role and features',
ADD COLUMN IF NOT EXISTS enable_housekeeping TINYINT(1) DEFAULT 1 COMMENT 'Enable Housekeeping module',
ADD COLUMN IF NOT EXISTS enable_kds TINYINT(1) DEFAULT 1 COMMENT 'Enable Kitchen Display System',
ADD COLUMN IF NOT EXISTS enable_reports TINYINT(1) DEFAULT 1 COMMENT 'Enable Reports module';

-- Step 2: Enable all features for all restaurants
UPDATE restaurant_tbl SET 
  enable_steward = 1,
  enable_housekeeping = 1,
  enable_kds = 1,
  enable_reports = 1;

-- Step 3: Verify the change
SELECT restaurant_id, name, enable_housekeeping FROM restaurant_tbl;
