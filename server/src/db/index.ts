// server/src/db/index.ts
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../hadi.db');

export const db = new Database(DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'viewer' CHECK(role IN ('admin', 'editor', 'viewer')),
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Factories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS factories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name_ar TEXT NOT NULL,
      name_en TEXT NOT NULL,
      tagline_ar TEXT,
      tagline_en TEXT,
      logo TEXT,
      hero_image TEXT,
      address_ar TEXT,
      address_en TEXT,
      phones TEXT DEFAULT '[]',
      email TEXT,
      map_url TEXT,
      lat REAL,
      lng REAL,
      description_ar TEXT,
      description_en TEXT,
      capabilities_ar TEXT DEFAULT '[]',
      capabilities_en TEXT DEFAULT '[]',
      advantages_ar TEXT DEFAULT '[]',
      advantages_en TEXT DEFAULT '[]',
      industries_ar TEXT DEFAULT '[]',
      industries_en TEXT DEFAULT '[]',
      kpis TEXT DEFAULT '[]',
      order_index INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Factory locations table (multi-location support)
  db.exec(`
    CREATE TABLE IF NOT EXISTS factory_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      factory_id INTEGER NOT NULL,
      address_ar TEXT NOT NULL,
      address_en TEXT NOT NULL,
      phones TEXT DEFAULT '[]',
      email TEXT,
      map_url TEXT,
      lat REAL,
      lng REAL,
      is_primary INTEGER DEFAULT 0,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (factory_id) REFERENCES factories(id) ON DELETE CASCADE
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      factory_id INTEGER NOT NULL,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      desc_ar TEXT,
      desc_en TEXT,
      img TEXT,
      category_ar TEXT,
      category_en TEXT,
      specs TEXT DEFAULT '{}',
      additional_images TEXT DEFAULT '[]',
      context_image TEXT,
      technical_drawing TEXT,
      pdf_url TEXT,
      order_index INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (factory_id) REFERENCES factories(id) ON DELETE CASCADE
    )
  `);

  // Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_factories_slug ON factories(slug);
    CREATE INDEX IF NOT EXISTS idx_factories_status ON factories(status);
    CREATE INDEX IF NOT EXISTS idx_factory_locations_factory_id ON factory_locations(factory_id);
    CREATE INDEX IF NOT EXISTS idx_products_factory_id ON products(factory_id);
    CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
  `);

  console.log('Database initialized successfully');
}

// Initialize on import
initDatabase();
