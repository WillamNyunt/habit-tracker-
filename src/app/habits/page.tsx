import React from "react";
import Card from "../../../public/components/ui/card";

export default function HabitsPage() {
  return (
    <>
      <h1>All habits</h1>
      <div className="grid gap-4 grid-cols-3">
        <Card className="col-span-2">
          <div className="flex w-full justify-between">
            <h2>Habits</h2>
            <button className="button-primary">Add habit</button>
          </div>
        </Card>
        <Card>
          <h2>Weekly record</h2>
        </Card>
      </div>
    </>
  );
}
