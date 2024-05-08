import sql from "better-sqlite3";
import xss from "xss";
import slugify from "slugify";
import fs from "node:fs";

const db = sql("habits.db");

export async function getHabits() {
  return db.prepare("SELECT * FROM habits").all();
}

export async function saveHabitDb(data: { name: string }) {
  const slug = slugify(data.name, { lower: true });
  const stmt = db.prepare("INSERT INTO habits (name, slug) VALUES (?, ?)");
  stmt.run(xss(data.name), slug);
}