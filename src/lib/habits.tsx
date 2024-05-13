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

export async function saveHabitDb(data: { name: string }) {
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare("INSERT INTO habits (name, slug) VALUES (?, ?)");
  stmt.run(xss(data.name), slug);
}

export async function editHabitDb(data: { name: string; id: string }) {
  const habit = getHabitById(data.id);
  if (!habit) {
    throw new Error("Habit not found");
  }
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare("UPDATE habits SET name = ?, slug = ? WHERE habit_id = ?");
  stmt.run(xss(data.name), slug, data.id);
}

export async function deleteHabitDb(id: string) {
  const stmt = db.prepare("DELETE FROM habits WHERE habit_id = ?");
  stmt.run(id);
}
