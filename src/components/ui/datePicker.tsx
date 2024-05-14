"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useRouter, usePathname } from "next/navigation";

const DatePicker: React.FC<{ date: string }> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [date, setDate] = useState<{
    defaultValue: moment.Moment | null;
    selectedDate: moment.Moment | null;
  }>({ defaultValue: moment(props.date), selectedDate: null });
  useEffect(() => {
    if (props.date) {
      setDate({
        defaultValue: moment(props.date),
        selectedDate: moment(props.date),
      });
    }
  }, [props.date]);

  function handleDateAccept(value: moment.Moment | null) {
    //change router
    if (value) {
      const date = value.format("YYYY-MM-DD");
      if (pathname === "/track") {
        router.push(`/track/${date}`);
      } else {
        router.replace(`/track/${date}`);
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        onAccept={(value) => handleDateAccept(value)}
        value={date.selectedDate}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
