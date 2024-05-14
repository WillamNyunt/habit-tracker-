"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

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
      <div className="flex flex-row gap-2 items-center">
        <Link
          href={`/track/${moment(date.defaultValue)
            .subtract(1, "days")
            .format("YYYY-MM-DD")}`}
        >
          <button className="bg-black text-white square rounded-full" style={{width: '30px', height: '30px'}}>{'<'}</button>
        </Link>
        <MobileDatePicker
          onAccept={(value) => handleDateAccept(value)}
          value={date.selectedDate}
          maxDate={moment()}
        />
        {moment(date.defaultValue).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <Link
            href={`/track/${moment(date.defaultValue)
              .add(1, "days")
              .format("YYYY-MM-DD")}`}
          >
            <button className="bg-black text-white square rounded-full" style={{width: '30px', height: '30px'}}>{'>'}</button>
          </Link>
        ) : <button disabled className="bg-slate-200 text-white square rounded-full" style={{width: '30px', height: '30px'}}>{'>'}</button>}
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
