"use client";

import React, { useEffect } from "react";
import CalenadarHeatMap from "@/components/CalendarHeatMap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import moment from "moment";


const HabitTrackerCalendar = () => {
    const [date, setDate] = useState<string | null>(moment().format("YYYY-MM-DD"));

    /* The month returned from Datepicker value is index 0 - 11 */
    const month = moment(date).month() + 1;
    const year = moment(date).year();

    const fetchData = async () => {
        try {
            const inputValue = date;
            const res = await fetch('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await res.json();
            console.log(result)
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label={"Select month"}
                    views={["month", "year"]}
                    value={moment(date)}
                    onAccept={value => setDate(value!.format("YYYY-MM-DD"))}
                    className="mb-5"
                />
            </LocalizationProvider>
            <CalenadarHeatMap month={month} year={year} />
        </div>
    );
};

export default HabitTrackerCalendar;
