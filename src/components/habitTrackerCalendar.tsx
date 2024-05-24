'use client'
import React, { useEffect } from "react";
import CalenadarHeatMap from "@/components/CalendarHeatMap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getHabitChecksByMonthAction } from "@/lib/actions";
import { useState } from "react";
import moment from "moment";



const HabitTrackerCalendar = () => {
    const [date, setDate] = useState<string | null>(moment().format("YYYY-MM-DD"));
    const [highlightedDays, setHighlightedDays] = useState<{ date: string, frequency: number }[]>([]);
    /* The month returned from Datepicker value is index 0 - 11 */
    const month = moment(date).month() + 1;
    const monthFormatted = month < 10 ? `0${month}` : month.toString();
    const year = moment(date).year();


    const fetchData = async () => {
        try {
            const result = await getHabitChecksByMonthAction(monthFormatted, year.toString());
            const data = JSON.parse(result).data;
            //map highlighted days (data) to { date, frequency } if it is the same date add to frequency data in format YYYY-MM-DD, return an array of objects, no duplicates of date
            const highlightedDaysMap = data.reduce((acc: any, habitCheck: any) => {
                const date = moment(habitCheck.date).format("YYYY-MM-DD");
                if (!acc.find((highlightedDay: any) => highlightedDay.date === date)) {
                    acc.push({ date, frequency: 1 });
                } else {
                    acc.find((highlightedDay: any) => highlightedDay.date === date).frequency += 1;
                }
                return acc;
            }, []) as { date: string, frequency: number }[];

            console.log(highlightedDaysMap)


            setHighlightedDays(prevHighlightedDays => [...prevHighlightedDays, ...highlightedDaysMap])
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [date]);

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
            <CalenadarHeatMap month={month} year={year} highlightedDays={highlightedDays} />
        </div>
    );
};

export default HabitTrackerCalendar;
