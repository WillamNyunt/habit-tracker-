import React from "react";
import MonthMap from "./MonthMap";
import Card from "../ui/card";
import classes from "./index.module.css";
import toolTipClass from "./tooltip.module.css";

function ToolTip({
  children,
  className,
  style,
  frequency,
}: {
  children: React.ReactNode;
  className?: string;
  style: { [key: string]: string };
  frequency: number;
}): React.ReactElement {
  return <div className={`${toolTipClass.tooltip} ${className}`} style={style}>{children}{frequency !== 0 && <span className={toolTipClass.span}>Habit{frequency > 1 && 's'} checked: {frequency}</span>}</div>;
}

/**
 * 
 * @returns {React.ReactElement} returns a calendar heatmap component
 * @param {number} month - month of the year in format M (1-12)
 * @param {number} year - year in format YYYY
 * @param {{date: string, frequency: number}[]}} highlightedDays - array of days to highlight
 */
export default function CalenadarHeatMap({month, year, highlightedDays}: {month: number, year: number, highlightedDays: {date: string, frequency: number}[]}) : React.ReactElement {
  const monthMap = new MonthMap(month, year);
  const daysOfWeek = monthMap.dayArr;
  const highlight =  highlightedDays;
  
  monthMap.addHighlightedDays(highlight);

  return (
    <Card className='mt-4 mb-4'>
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
                    style={{ gridColumnStart: `${day.getDay() != 0 ? day.getDay() : 7}` }}
                    className={`${monthMap.getHighlightedDay(day) ? classes.highlighted : ''}  ${classes.day}`}
                    frequency={monthMap.getFrequency(day)}
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
