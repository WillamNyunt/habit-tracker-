import React from "react";
import {
  getHabits,
  getAllHabitChecks,
  getHabitChecksByMonth,
} from "@/lib/habits";
import Card from "../ui/card";
import moment from "moment";
import classes from "./calnedarViewMap.module.css";

interface HabitChecksMap {
  [key: number]: string[];
}

const CalendarViewMap: React.FC = async () => {
  const habits: any = await getHabits();

  const daysThisMonth = moment().daysInMonth();
  const daysArray = Array.from(Array(daysThisMonth).keys());
  //form days array into { number: 1 , day: M} e.g.
  const habitChecks = await getHabitChecksByMonth(moment().format("YYYY-MM"));
  const nameOfMonth = moment().format("MMMM");
  // map habitChecks check_date to { date (array format e.g. day of month 0 - 31) , [habit ids] }
  const habitChecksMap = habitChecks.reduce((acc: any, habitCheck: any) => {
    const date = moment(habitCheck.check_date).date();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(habitCheck.habit_id);
    return acc;
  }, {}) as HabitChecksMap;

  return (
    <Card className="flex flex-col overflow-auto">
      <div className="flex justify-center">
        <h3>{nameOfMonth} {moment().format('YYYY')}</h3>
      </div>      
      <div className="grid grid-flow-col">
        <div className="grid grid-flow-row">
          <div className="invisible">Habit</div>
          {habits.map((habit: any) => (
            <div key={habit}>{habit.name}</div>
          ))}
        </div>
        {daysArray.map((day: number) => (
          <>
            <div className="grid grid-flow-row">
              <div>{day + 1}</div>
              {habits.map((habit: any) => (
                <div
                  key={habit.habit_id}
                  className={`${
                    habitChecksMap[day + 1]?.includes(habit.habit_id)
                      ? classes.checked
                      : classes.unchecked
                  }`}
                ></div>
              ))}
            </div>
          </>
        ))}
      </div>
    </Card>
  );
};

export default CalendarViewMap;
