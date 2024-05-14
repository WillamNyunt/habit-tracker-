import moment from "moment";

/** Accepts date formatted in 'YYYY-MM-DD' and returns a title for the date. If it is today, it returns 'Today', if it is tomorrow, it returns 'Tomorrow', if it is yesterday, it returns 'Yesterday', otherwise it returns the date in format 'dddd, MMMM Do YYYY'
 * 
 * @param dateFormatted 
 * @returns 
 */
export function getDateTitle(dateFormatted: string) {
    const today = moment(dateFormatted).format("YYYY-MM-DD");
    let selectedDate = "";
    if (today === moment().format("YYYY-MM-DD")) {
      selectedDate = "Today";
    } else if (today === moment().add(1, "days").format("YYYY-MM-DD")) {
      selectedDate = "Tomorrow";
    } else if (today === moment().subtract(1, "days").format("YYYY-MM-DD")) {
      selectedDate = "Yesterday";
    } else {
      selectedDate = moment(dateFormatted).format("dddd, MMMM Do YYYY");
    }
    return selectedDate;
  }