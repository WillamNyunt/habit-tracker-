import React from "react";
import Card from "../../components/ui/card";
import Link from "next/link";
import HabitsCardGrid from "../../components/habitCardGrid"


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
        <Card>
          <h2>Weekly record</h2>
        </Card>
      </div>
    </>
  );
}
