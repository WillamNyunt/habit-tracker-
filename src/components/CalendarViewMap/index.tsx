import React from "react";
import { getHabits } from "@/lib/habits";
import Card from "../ui/card";

const CalendarViewMap: React.FC = async () => {
  const habits: any = await getHabits();
  const dates = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Card className="flex flex-row">
      <div className="flex flex-col">
        {habits.map((habit: any) => (
          <div key={habit.habit_id} className="flex align-middle">
            <span className="flex items-center">{habit.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {dates.map((date: string) => (
            <div key={date} className="flex items-center">
              <span>{date}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CalendarViewMap;
