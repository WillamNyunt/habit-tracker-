import React from 'react';
import CalenadarHeaTMap from "@/components/CalendarHeatMap";

const HabitTrackerCalendar = () => {
    return (
        <div>
            <h1>Habit Tracker Calendar</h1>
            <CalenadarHeaTMap month={5} year={2024} />
        </div>
    )
}

export default HabitTrackerCalendar;

