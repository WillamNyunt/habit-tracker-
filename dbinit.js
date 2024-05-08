//make a db table called 'habits' 
const sql = require('better-sqlite3');
const db = sql('habits.db');

db.prepare('CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, name TEXT, slug TEXT NOT NULL UNIQUE)').run();

