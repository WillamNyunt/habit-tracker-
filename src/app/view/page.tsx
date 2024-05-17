import React from "react";
import CalendarViewMap from "@/components/CalendarViewMap";
import moment from "moment";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string }
}


const ViewPage: React.FC<Props> = ({searchParams}) => {
  const { month, year } = searchParams;
  // if (!month || !year) {

  if (!month || !year) {
      //get this month in format MM number
      const month = moment().format("MM");
      //get this year in format YYYY number
      const year = moment().format("YYYY");
     return (
        <div>
          <h1>View</h1>
          <CalendarViewMap month={month} year={year} />
        </div>
      );
  }

  return (
    <div>
      <h1>View</h1>
        <CalendarViewMap month={month} year={year} />
    </div>
  );
};


export default ViewPage;