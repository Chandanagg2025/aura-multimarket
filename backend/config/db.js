const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
let dbDir = path.join(__dirname, '../database');

if (isVercel) {
  dbDir = '/tmp';
} else if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'aura_market.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite Database at:', dbPath);
  }
});

// Initialize database schema tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sector TEXT NOT NULL,
      sector_name TEXT NOT NULL,
      sub_category TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      rating REAL DEFAULT 5.0,
      reviews_count INTEGER DEFAULT 0,
      badge TEXT,
      is_featured INTEGER DEFAULT 0,
      image TEXT NOT NULL,
      description TEXT,
      specs TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_ref TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      subtotal REAL NOT NULL,
      discount REAL DEFAULT 0,
      tax REAL NOT NULL,
      shipping_fee REAL DEFAULT 0,
      total_paid REAL NOT NULL,
      status TEXT DEFAULT 'Payment Confirmed'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_ref TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      sector TEXT,
      FOREIGN KEY (order_ref) REFERENCES orders(order_ref)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      value REAL NOT NULL,
      description TEXT NOT NULL
    )
  `);

  // Auto seed if database is empty (for Vercel serverless instance)
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (!err && row && row.count === 0) {
      console.log("Auto-seeding products for serverless instance...");
      const seedScript = require('../seed_data');
      seedScript(db);
    }
  });
});

module.exports = db;
