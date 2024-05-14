
/**
 * This class will take in a month and year and return a map of the month
 * with the first day of the month and the last day of the month
 * @returns {MonthMap} returns a month map object 
 */
export default class MonthMap {
    firstDay : Date; 
    firstDayOfWeekOne : number;
    lastDayOfMonth : number;
    dayArr : string[];

    /**
     * 
     * @param month - format MM (01, 12) 
     * @param year - format YYYY 
     */ 
    constructor(month : number, year: number) {
        if (month < 1 || month > 12) {
            throw new Error('Month must be between 1 and 12');
        } 
        if (year < 1000 || year > 9999) {
            throw new Error('Year must be between 1000 and 9999');
        }

        let monthStr : string;
        if (month < 10) {
            monthStr = `0${month}`;
        } else {
            monthStr = `${month}`;
        }
  
        this.firstDay = new Date(`${year}-${monthStr}-01`);
        this.lastDayOfMonth = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
        this.firstDayOfWeekOne = this.firstDay.getDay();
        this.dayArr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    }

    getDaysInMonth() {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    }

    getNumberOfWeeks() {
        let daysInMonth = this.getDaysInMonth();
        return Math.ceil(daysInMonth / 7);
    }
        

    getLastDayOfMonth() {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    }

    getFirstDayOfTheMonth() {
        return this.firstDay.getDay();
    }

    /** 
    * This function will iterate through the days of the month and return an array of dates
    */ 
    getDaysOfMonthArray() {
        let month = [] as Date[];
        for (let i = 1; i < this.getDaysInMonth() + 1; i++) {
            let date = new Date(`${this.firstDay.getFullYear()}-${this.firstDay.getMonth() + 1}-${i}`);
            month.push(date);
        }
        return month;
    }

    formMonthDayMatrix() {
        const Month = this.getDaysOfMonthArray();
        let matrix : Date[][] = [];
        let week : Date[] = []
        Month.forEach((day, index) => {
            if (day.getDay() === 1 && index !== 0){
                matrix.push(week);
                week = [];
                week.push(day);
            } else if (index === Month.length - 1) {
                week.push(day);
                matrix.push(week);
            } else {
                week.push(day);
            }
        });
        return matrix;
    }
}

const may = new MonthMap(1, 2024);
