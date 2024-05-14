import sql from "better-sqlite3";
import xss from "xss";
import slugify from "slugify";

const db = sql("habits.db");

export async function getHabits() {
  return db.prepare("SELECT * FROM habits").all();
}

export async function getHabitById(id: string) {
  return db.prepare("SELECT * FROM habits WHERE habit_id = ?").get(id);
}

export async function saveHabitDb(data: { name: string; time_of_day: string }) {
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare(
    "INSERT INTO habits (name, time_of_day, slug) VALUES (?, ?, ?)"
  );
  stmt.run(xss(data.name), data.time_of_day, slug);
}

export async function editHabitDb(data: {
  name: string;
  time_of_day: string;
  id: string;
}) {
  const habit = getHabitById(data.id);
  if (!habit) {
    throw new Error("Habit not found");
  }
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare(
    "UPDATE habits SET name = ?, time_of_day = ?, slug = ? WHERE habit_id = ?"
  );
  stmt.run(xss(data.name), data.time_of_day, slug, data.id);
}

export async function deleteHabitDb(id: string) {
  const stmt = db.prepare("DELETE FROM habits WHERE habit_id = ?");
  stmt.run(id);
}

export async function addDateToHabit(data: {
  date: string;
  habit_id: string;
  notes: string;
}) {
  console.log(data)
  console.log('add date to habit')
  const stmt = db.prepare('INSERT INTO HabitChecks (habit_id, check_date, notes) VALUES (?, ?, ?)');
  stmt.run(data.habit_id, data.date, data.notes);
}

export async function getDateIdByDate(date: string) {
  const stmt = db.prepare("SELECT date_id FROM dates WHERE date = ?");
  return stmt.get(date);
}
/**
 * 
 * @param date 
 * @returns all dates at the date provided.
 */
export async function getHabitChecksByDate(date: string) {
  if (!date) {
    throw new Error("Date is required");
  }
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("Date must be in format YYYY-MM-DD");
  }
  return db.prepare('SELECT * FROM HabitChecks WHERE check_date = ?').all(date);
}