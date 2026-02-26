-- Add missing feature flag columns to restaurant_tbl

ALTER TABLE restaurant_tbl ADD COLUMN IF NOT EXISTS enable_steward TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE restaurant_tbl ADD COLUMN IF NOT EXISTS enable_kds TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE restaurant_tbl ADD COLUMN IF NOT EXISTS enable_reports TINYINT(1) NOT NULL DEFAULT 1;

SELECT 'Feature flag columns added successfully!' AS Status;
