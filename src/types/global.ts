export interface Habit {
    name: string;
    id: string;
    slug: string;
    time_of_day: string;
  }

export interface TimeOfDay {
    title: string;
    color: string;
    textColor: string;
    habits: Habit[];
    time_of_day: string;
}