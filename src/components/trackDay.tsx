import React from "react";
import ColourfulTitle from "./ui/colourfulTitle";
import { getHabits } from "@/lib/habits";
import HabitCheckColumn from "./habitCheckColumn";
import moment from "moment";
import DatePicker from "./ui/datePicker";
import { Suspense } from "react";
import { Habit } from "@/types";
import { timeOfDayConfig } from "@/lib/config";

interface TrackDayProps {
  date: string;
}

/** Accepts day as string in format 'YYYY-MM-DD' and returns a page to track habits for that day
 * 
 * @param date 
 * @returns 
 */
const TrackDay: React.FC<TrackDayProps> = async ({date}) => {
  let timeOfDay = timeOfDayConfig;

  const habits = (await getHabits()) as Habit[];
  timeOfDay = timeOfDay.map((time) => {
    time.habits = habits.filter((habit) => habit.time_of_day === time.time_of_day);
    return time;
  });

  let todayFormatted = "";

  if (!date) {
    const today = new Date();
    todayFormatted = moment(today).format("YYYY-MM-DD");
  } else {
    todayFormatted = date;
  }

  const today = moment(todayFormatted).format("YYYY-MM-DD");
  console.log
  let selectedDate = today;

  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <h2 className="mb-5">{selectedDate}</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <DatePicker date={todayFormatted} />
        </Suspense>
      </div>
      <div className="rounded grid grid-cols-4 gap-2">
        {timeOfDay.map((time) => (
          <div>
            <ColourfulTitle
              key={time.title}
              title={time.title}
              subtitle={`${time.habits.length} ${
                time.habits.length > 1 ? "habits" : "habit"
              }`}
              color={time.color}
              textColor={time.textColor}
            />
            <HabitCheckColumn habits={time.habits} date={todayFormatted} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrackDay;
