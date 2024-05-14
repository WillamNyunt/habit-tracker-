"use client";

import React from "react";
import CalenadarHeaTMap from "@/components/CalendarHeatMap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import moment from "moment";

const HabitTrackerCalendar = () => {
const [date, setDate] = useState<string | null>(moment().format("YYYY-MM-DD"));

const month = moment(date).year();
const year = moment(date).year();

return (
    <div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label={"Select month"}
                views={["month", "year"]}
                value={moment(date)} 
                onAccept={value => setDate(value!.format("YYYY-MM-DD"))}
            />    
        </LocalizationProvider>
        <CalenadarHeaTMap month={month} year={year} />
    </div>
);
};

export default HabitTrackerCalendar;
