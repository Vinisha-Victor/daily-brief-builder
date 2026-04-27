// const initSqlJs = require("sql.js");
// const fs = require("fs");
// const path = require("path");

// const DB_PATH = path.join(__dirname, "../data/preferences.db");

// let db;

// async function getDb() {
//   if (db) return db;

//   const SQL = await initSqlJs();

//   // Ensure data dir exists
//   const dataDir = path.dirname(DB_PATH);
//   if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

//   // Load existing DB or create fresh
//   if (fs.existsSync(DB_PATH)) {
//     const fileBuffer = fs.readFileSync(DB_PATH);
//     db = new SQL.Database(fileBuffer);
//   } else {
//     db = new SQL.Database();
//   }

//   // Create preferences table
//   db.run(`
//     CREATE TABLE IF NOT EXISTS preferences (
//       user_id     TEXT PRIMARY KEY,
//       name        TEXT NOT NULL DEFAULT '',
//       city        TEXT NOT NULL DEFAULT '',
//       categories  TEXT NOT NULL DEFAULT '[]',
//       theme       TEXT NOT NULL DEFAULT 'midnight',
//       language    TEXT NOT NULL DEFAULT 'en',
//       brief_time  TEXT NOT NULL DEFAULT 'morning',
//       units       TEXT NOT NULL DEFAULT 'metric',
//       created_at  TEXT NOT NULL DEFAULT (datetime('now')),
//       updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
//     )
//   `);

//   persist();
//   return db;
// }

// // Persist in-memory DB back to file after every write
// function persist() {
//   if (!db) return;
//   const data = db.export();
//   const buffer = Buffer.from(data);
//   const dataDir = path.dirname(DB_PATH);
//   if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
//   fs.writeFileSync(DB_PATH, buffer);
// }

// module.exports = { getDb, persist };

import initSqlJs from 'sql.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, '../../data/preferences.db')

let db

export async function getDb() {
  if (db) return db

  const SQL = await initSqlJs()

  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS preferences (
      user_id     TEXT PRIMARY KEY,
      name        TEXT NOT NULL DEFAULT '',
      city        TEXT NOT NULL DEFAULT '',
      categories  TEXT NOT NULL DEFAULT '[]',
      theme       TEXT NOT NULL DEFAULT 'midnight',
      language    TEXT NOT NULL DEFAULT 'en',
      brief_time  TEXT NOT NULL DEFAULT 'morning',
      units       TEXT NOT NULL DEFAULT 'metric',
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  persist()
  return db
}

export function persist() {
  if (!db) return
  const data = db.export()
  const buffer = Buffer.from(data)
  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(DB_PATH, buffer)
}