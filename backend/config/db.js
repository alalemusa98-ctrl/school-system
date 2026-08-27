const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const driver = process.env.DB_DRIVER || 'sqlite';

let dbWrapper = {};

if (driver === 'mysql') {
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  dbWrapper = {
    driver: 'mysql',
    query: async (sql, params = []) => {
      const [rows, fields] = await pool.query(sql, params);
      return [rows, fields];
    },
    getPool: () => pool
  };
} else {
  // SQLite driver
  const sqlite3 = require('sqlite3').verbose();
  const dbDir = path.join(__dirname, '../database');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, 'school.sqlite');

  const sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('[DB] فشل فتح قاعدة بيانات SQLite:', err.message);
    }
  });

  // Enable foreign keys
  sqliteDb.run('PRAGMA foreign_keys = ON;');

  dbWrapper = {
    driver: 'sqlite',
    query: (sql, params = []) => {
      return new Promise((resolve, reject) => {
        const trimmed = sql.trim();
        const isSelect = /^SELECT/i.test(trimmed) || /^PRAGMA/i.test(trimmed);

        if (isSelect) {
          sqliteDb.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve([rows, null]);
          });
        } else {
          sqliteDb.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve([{ insertId: this.lastID, affectedRows: this.changes }, null]);
          });
        }
      });
    },
    getRawDb: () => sqliteDb
  };
}

module.exports = dbWrapper;
