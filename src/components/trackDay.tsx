import React from "react";
import Card from "./ui/card";
import ColourfulTitle from "./ui/colourfulTitle";
import { getHabits } from "@/lib/habits";
import { habitColors, habitTitleColor } from "@/lib/config";
import HabitCheckGrid from "./habitCheckGrid";

interface Habit {
  name: string;
  time_of_day: string;
  slug: string;
}

interface TimeOfDay {
  title: string;
  color: string;
  textColor: string;
  habits: Habit[];
}

const TrackDay: React.FC<{}> = async () => {
  const timeOfDay: TimeOfDay[] = [
    {
      title: "Morning",
      color: habitColors.morning,
      textColor: habitTitleColor,
      habits: [],
    },
    {
      title: "Afternoon",
      color: habitColors.afternoon,
      textColor: habitTitleColor,
      habits: [],
    },
    {
      title: "Evening",
      color: habitColors.evening,
      textColor: habitTitleColor,
      habits: [],
    },
    {
      title: "All",
      color: habitColors.all,
      textColor: habitTitleColor,
      habits: [],
    },
  ];

  const habits = (await getHabits()) as Habit[];

  habits.forEach((habit) => {
    switch (habit.time_of_day) {
      case "morning":
        timeOfDay[0].habits.push(habit);
        break;
      case "afternoon":
        timeOfDay[1].habits.push(habit);
        break;
      case "evening":
        timeOfDay[2].habits.push(habit);
        break;
      default:
        timeOfDay[3].habits.push(habit);
    }
  });

  return (
    <Card className="flex flex-col rounded">
      <h2 className="mb-5">Today</h2>
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
            <HabitCheckGrid habits={time.habits} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrackDay;
