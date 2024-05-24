import React from "react";
import ColourfulTitle from "./ui/colourfulTitle";
import { getHabitsAction } from "@/lib/actions";
import HabitCheckColumn from "./habitCheckColumn";
import moment from "moment";
import DatePicker from "./ui/datePicker";
import { Suspense } from "react";
import { timeOfDayConfig } from "@/lib/config";
import { getDateTitle } from "@/app/util";
import { Habit } from "@/types";

interface TrackDayProps {
  date: string;
}

/** Accepts day as string in format 'YYYY-MM-DD' and returns a page with habit check columns for each time of day.
 * 
 * @param date 
 * @returns 
 */
const TrackDay: React.FC<TrackDayProps> = async ({date}) => {
  let timeOfDay = timeOfDayConfig;

  const habits = await getHabitsAction() as Habit[];
  timeOfDay = timeOfDay.map((time) => {
    time.habits = habits.filter((habit : Habit) => habit.time_of_day === time.time_of_day);
    return time;
  });

  let dateFormatted = "";

  if (!date) {
    const today = new Date();
    dateFormatted = moment(today).format("YYYY-MM-DD");
  } else {
    dateFormatted = date;
  }
  
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <h2 className="mb-5">{getDateTitle(dateFormatted)}</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <DatePicker date={dateFormatted} />
        </Suspense>
      </div>
      <div className="rounded grid grid-cols-4 gap-2">
        {timeOfDay.map((time) => (
          <div key={time.title}>
            <ColourfulTitle
              title={time.title}
              subtitle={`${time.habits.length} ${
                time.habits.length > 1 ? "habits" : "habit"
              }`}
              color={time.color}
              textColor={time.textColor}
            />
            <HabitCheckColumn habits={time.habits} date={dateFormatted} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrackDay;
