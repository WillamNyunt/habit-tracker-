//make a db table called 'habits' 
const sql = require('better-sqlite3');
const db = sql('habits.db');

/**
 * Creates three tables in the database: habits, habits_dates, and dates.
 */
function dbInit(){
    db.prepare('CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, name TEXT, slug TEXT NOT NULL UNIQUE)').run();
    db.prepare('CREATE TABLE IF NOT EXISTS habits_dates (date_id INTEGER, habit_id INTEGER, PRIMARY KEY (date_id, habit_id), FOREIGN KEY (date_id) REFERENCES dates (date_id), FOREIGN KEY (habit_id) REFERENCES habits (habit_id))').run();
    db.prepare('CREATE TABLE IF NOT EXISTS dates (date_id INTEGER PRIMARY KEY, date TEXT NOT NULL UNIQUE)').run();
}

//modify habit table and added time_of_day column

function dbInit2(){
    db.prepare('ALTER TABLE habits ADD COLUMN time_of_day TEXT').run();
}

function dbInit3(){
    db.prepare('CREATE TABLE IF NOT EXISTS HabitChecks (check_id INTEGER PRIMARY KEY, habit_id INTEGER, check_date TEXT, notes TEXT, FOREIGN KEY (habit_id) REFERENCES habits (habit_id))').run();
}

dbInit3();