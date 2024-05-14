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
 * @param {string[]} highlightedDays - array of days to highlight
 */
export default function CalenadarHeatMap({month, year, highlightedDays}: {month: number, year: number, highlightedDays: number[] | null }) : React.ReactElement {
  const monthMap = new MonthMap(month, year);
  const daysOfWeek = monthMap.dayArr;
  const highlight =  highlightedDays;

  return (
    <Card>
      <div className={classes.month}>
        <div className={classes.week}>
          {daysOfWeek.map((day, index) => {
            return <p key={index}>{day}</p>;
          })}
        </div>
        {monthMap.formMonthDayMatrix().map((week, index) => {
          return (
            <div key={index} className={classes.week + ' grid'}>
              {week.map((day, index) => {
                return (
                  <ToolTip
                    key={index}
                    className={highlight?.includes(day.getDate()) ? classes.highlighted : ""}
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
