import React from "react";
import {
  getHabits,
  getAllHabitChecks,
  getHabitChecksByMonth,
} from "@/lib/habits";
import Card from "../ui/card";
import moment from "moment";
import classes from "./calnedarViewMap.module.css";
import Link from "next/link";

interface HabitChecksMap {
  [key: number]: string[];
}

/**
 *
 * @param month - moth in format MM type string
 * @param year - year in format YYYY type string
 * @params year - year in format YYYY
 * @returns
 */

const CalendarViewMap: React.FC<{ month: string; year: string }> = async ({
  month,
  year,
}) => {
  const habits: any = await getHabits();
  const daysThisMonth = moment().daysInMonth();
  const daysArray = Array.from(Array(daysThisMonth).keys());

  //form days array into { number: 1 , day: M} e.g.
  const habitChecks = await getHabitChecksByMonth(
    moment().format(`${year}-${month}`)
  );

  const nameOfMonth = moment().month(month).subtract(1, "month").format("MMMM");

  // map habitChecks check_date to { date (array format e.g. day of month 0 - 31) , [habit ids] }
  const habitChecksMap = habitChecks.reduce((acc: any, habitCheck: any) => {
    const date = moment(habitCheck.check_date).date();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(habitCheck.habit_id);
    return acc;
  }, {}) as HabitChecksMap;

  if (!month) {
    return <div>Month is required</div>;
  }

  if (!year) {
    return <div>Year is required</div>;
  }

  //get next month of current 'month' params in format MM
  const nextMonth = moment(month, "MM").add(1, "month").format("MM");
  const prevMonth = moment(month, "MM").subtract(1, "month").format("MM");
  //get next year of current 'year' params in format YYYY
  const nextYear = moment(year, "YYYY").add(1, "year").format("YYYY");

  return (
    <Card className="flex flex-col overflow-auto">
      <div className="flex justify-center">
        <Link href={{ query: { month: prevMonth, year: "2024" } }}>
          <button>Previous Month</button>
        </Link>
        <h3>
          {nameOfMonth} {moment().format(year)}
        </h3>
        <Link href={{ query: { month: nextMonth, year: "2024" } }}>
          <button>Next Month</button>
        </Link>
      </div>
      <div className="grid grid-flow-col">
        <div className="grid grid-flow-row">
          <div className="invisible">Hidden</div>
          <div className="invisible">Hidden</div>
          {habits.map((habit: any) => (
            <div key={habit}>{habit.name}</div>
          ))}
        </div>
        {daysArray.map((day: number) => (
          <>
            <div className="grid grid-flow-row">
              <div>{day + 1}</div>
              <div>
                {moment(
                  `${year}-${month}-${day + 1 < 10 ? "0" + (day + 1) : day + 1}`
                ).format("dd")}
              </div>
              {habits.map((habit: any) => (
                <div
                  key={habit.habit_id}
                  className={`${
                    habitChecksMap[day + 1]?.includes(habit.habit_id)
                      ? classes.checked
                      : classes.unchecked
                  } ${day + 1 > moment().date() && moment().format("MM") === month  ? classes.disabled : ""}`}
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
