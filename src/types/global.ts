import { ObjectId } from "mongodb";

export interface Habit {
    identifier: string;
    name: string;
    time_of_day: string;
  }

export interface TimeOfDay {
    title: string;
    color: string;
    textColor: string;
    habits: Habit[];
    time_of_day: string;
}

export interface HabitCheck {
    habit_id: string;
    check_date: string;
    notes: string;
}