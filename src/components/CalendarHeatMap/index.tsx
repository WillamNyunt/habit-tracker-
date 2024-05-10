import React from "react";
import MonthMap from "./MonthMap";
import Card from "../ui/card";
import classes from "./index.module.css";

function ToolTip({
  children,
  className,
  style
}: {
  children: React.ReactNode;
  className?: string;
  style: { [key: string]: string };
}): React.ReactElement {
  return <div className={className} style={style}>{children}</div>;
}

/**
 * 
 * @returns {React.ReactElement} returns a calendar heatmap component
 * @param {number} month - month of the year in format M (1-12)
 * @param {number} year - year in format YYYY
 */
export default function CalenadarHeaTMap({month, year}: {month: number, year: number}) : React.ReactElement {
  const may = new MonthMap(month, year);
  const daysOfWeek = may.dayArr;
  return (
    <Card>
      <div className={classes.month}>
        <div className={classes.week}>
          {daysOfWeek.map((day, index) => {
            return <p key={index}>{day}</p>;
          })}
        </div>
        {may.formMonthDayMatrix().map((week, index) => {
          return (
            <div key={index} className={classes.week + ' grid'}>
              {week.map((day, index) => {
                return (
                  <ToolTip
                    key={index}
                    style={{ gridColumnStart: `${day.getDay() != 0 ? day.getDay() : 7}` }}
                  >
                    {day.getDate()}
                  </ToolTip>
                );
              })}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
