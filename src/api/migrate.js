const { db } = require('./database.js');

const migrate = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      image_url TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      details TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Migration completed: reports table created.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
