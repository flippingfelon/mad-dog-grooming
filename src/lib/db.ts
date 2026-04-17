import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "mad-dog.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    migrate(_db);
  }
  return _db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS owners (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      grooming_notes TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS dogs (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      breed TEXT DEFAULT '',
      grooming_notes TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
      dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
      start_at TEXT NOT NULL,
      end_at TEXT NOT NULL,
      service TEXT DEFAULT '',
      status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'completed', 'canceled')),
      notes TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}
