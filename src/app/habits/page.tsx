import React from "react";
import Card from "../../components/ui/card";
import Link from "next/link";
import HabitsCardGrid from "../../components/habitCardGrid";
import HabitTrackerCalendar from "@/components/habitTrackerCalendar";

export default function HabitsPage() {
  return (
    <>
      <h1>All habits</h1>
      <div className="grid gap-4 grid-cols-3">
        <Card className="col-span-2 flex flex-col">
          <div className="flex w-full justify-between mb-5">
            <h2>Habits</h2>
            <Link href="?modal=true&type=add-habit">
              <button className="button-primary">Add</button>
            </Link>
          </div>
            <HabitsCardGrid />
        </Card>
        <Card className="flex flex-col">
          <h2 className="mb-5">Monthly record</h2>
          <HabitTrackerCalendar />
        </Card>
      </div>
    </>
  );
}
