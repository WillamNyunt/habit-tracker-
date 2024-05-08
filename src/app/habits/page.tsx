import React from "react";
import Card from "../../components/ui/card";
import Link from "next/link";
import { getHabits } from "@/lib/habits";

async function Habits() {
  const habits : any =  await getHabits();
  console.log(habits)

  return (
    <>
     {habits.map ((habit : any) => (
        <div key={habit.id} className="flex justify-between">
          <span>{habit.name}</span>
          <Link href={`?modal=true&type=edit-habit&id=${habit.id}`}>
          <button className="button-primary">Edit</button>
          </Link>
        </div>
      ))}
    </>
  );
}


export default function HabitsPage() {
  return (
    <>
      <h1>All habits</h1>
      <div className="grid gap-4 grid-cols-3">
        <Card className="col-span-2 flex flex-col">
          <div className="flex w-full justify-between">
            <h2>Habits</h2>
            <Link href="?modal=true&type=add-habit">
            <button className="button-primary">Add</button>
            </Link>
          </div>
          <Habits />
        </Card>
        <Card>
          <h2>Weekly record</h2>
        </Card>
      </div>
    </>
  );
}
