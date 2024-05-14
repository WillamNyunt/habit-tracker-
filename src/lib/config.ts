import { TimeOfDay } from "@/types";


export const habitColors = {
    all: "#000000",        // Black for general or default use
    morning: "#5980ff",    // Light Blue for morning
    afternoon: "#e8811a",  // Soft Orange for afternoon
    evening: "#643bc4"     // Royal Purple for evening
};

export const habitTitleColor = '#FFFFFF'; // White for text color of habit title

export const timeOfDayConfig: TimeOfDay[] = [
    {
      title: "Morning",
      color: habitColors.morning,
      textColor: habitTitleColor,
      habits: [],
      time_of_day: "morning"
    },
    {
      title: "Afternoon",
      color: habitColors.afternoon,
      textColor: habitTitleColor,
      habits: [],
      time_of_day: "afternoon"
    },
    {
      title: "Evening",
      color: habitColors.evening,
      textColor: habitTitleColor,
      habits: [],
      time_of_day: "evening"
    },
    {
      title: "All",
      color: habitColors.all,
      textColor: habitTitleColor,
      habits: [],
      time_of_day: "all"
    },
  ];
