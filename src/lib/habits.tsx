import sql from "better-sqlite3";
import xss from "xss";
import slugify from "slugify";

const db = sql("habits.db");

export async function getHabits() {
  return db.prepare("SELECT * FROM habits").all();
}

export async function getHabitById(id: string) {
  console.log(id)
  return db.prepare("SELECT * FROM habits WHERE habit_id = ?").get(id);
}

export async function saveHabitDb(data: { name: string, time_of_day: string}) {
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare("INSERT INTO habits (name, time_of_day, slug) VALUES (?, ?, ?)");
  stmt.run(xss(data.name), data.time_of_day, slug);
}

export async function editHabitDb(data: { name: string; time_of_day: string; id: string }) {
  const habit = getHabitById(data.id);
  if (!habit) {
    throw new Error("Habit not found");
  }
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare("UPDATE habits SET name = ?, time_of_day = ?, slug = ? WHERE habit_id = ?");
  stmt.run(xss(data.name), data.time_of_day, slug, data.id);
}

export async function deleteHabitDb(id: string) {
  const stmt = db.prepare("DELETE FROM habits WHERE habit_id = ?");
  stmt.run(id);
}
