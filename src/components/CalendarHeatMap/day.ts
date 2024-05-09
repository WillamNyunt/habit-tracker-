class MonthMap {
    firstDay : Date; 
    firstDayOfWeekOne : number;
    lastDayOfMonth : number;
    dayArr : string[];

    constructor(month : number, year: number) {
        this.firstDay = new Date(`${year}-${month}-01`);
        this.lastDayOfMonth = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
        this.firstDayOfWeekOne = this.firstDay.getDay();
        this.dayArr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    }

    getDaysInMonth() {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    }

    getNumberOfWeeks() {
        let daysInMonth = this.getDaysInMonth();
        let firstDayOfWeekOne = this.firstDayOfWeekOne;
        let daysLeft = daysInMonth - (7 - firstDayOfWeekOne);

        return Math.ceil(daysLeft / 7) + 1;
    }

    getLastDayOfMonth() {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    }

    interateThroughWeek() {
        let month = [];
        for (let i = 0; i < this.getNumberOfWeeks() ; i++) {
            let week = [];
            for (let j = 1; j < 8 ; j ++) {
                if (j < this.firstDayOfWeekOne && i == 0) {
                    week.push('')
                } else if ((i === (this.getNumberOfWeeks() - 1)) && (j > (this.lastDayOfMonth + this.firstDayOfWeekOne) % 7 - 1) ) {
                    week.push('')
                } else {
                    week.push(this.dayArr[j - 1])
                }
            }
            month.push(week)
        }
        return month
    }
}

const may = new MonthMap(6, 2024);

console.log(may.interateThroughWeek());