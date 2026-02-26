const mysql = require('mysql2/promise');
require('dotenv').config();

async function addMissingFeatureFlags() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'restaurant_app'
  });

  try {
    console.log('Adding missing feature flag columns...');

    // Add enable_steward
    try {
      await connection.execute(`
        ALTER TABLE restaurant_tbl 
        ADD COLUMN enable_steward TINYINT(1) NOT NULL DEFAULT 1
      `);
      console.log('✅ Added enable_steward column');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠️  enable_steward already exists');
      } else {
        throw err;
      }
    }

    // Add enable_kds
    try {
      await connection.execute(`
        ALTER TABLE restaurant_tbl 
        ADD COLUMN enable_kds TINYINT(1) NOT NULL DEFAULT 1
      `);
      console.log('✅ Added enable_kds column');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠️  enable_kds already exists');
      } else {
        throw err;
      }
    }

    // Add enable_reports
    try {
      await connection.execute(`
        ALTER TABLE restaurant_tbl 
        ADD COLUMN enable_reports TINYINT(1) NOT NULL DEFAULT 1
      `);
      console.log('✅ Added enable_reports column');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠️  enable_reports already exists');
      } else {
        throw err;
      }
    }

    console.log('\n✅ All feature flag columns are now present!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

addMissingFeatureFlags();
