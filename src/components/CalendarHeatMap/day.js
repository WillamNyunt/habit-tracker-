var MonthMap = /** @class */ (function () {
    function MonthMap(month, year) {
        this.firstDay = new Date("".concat(year, "-").concat(month, "-01"));
        this.lastDayOfMonth = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
        this.firstDayOfWeekOne = this.firstDay.getDay();
        this.dayArr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    }
    MonthMap.prototype.getDaysInMonth = function () {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    };
    MonthMap.prototype.getNumberOfWeeks = function () {
        var daysInMonth = this.getDaysInMonth();
        var firstDayOfWeekOne = this.firstDayOfWeekOne;
        var daysLeft = daysInMonth - (7 - firstDayOfWeekOne);
        return Math.ceil(daysLeft / 7) + 1;
    };
    MonthMap.prototype.getLastDayOfMonth = function () {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    };
    MonthMap.prototype.interateThroughWeek = function () {
        var month = [];
        for (var i = 0; i < this.getNumberOfWeeks(); i++) {
            var week = [];
            for (var j = 1; j < 8; j++) {
                if (j < this.firstDayOfWeekOne && i == 0) {
                    week.push('');
                }
                else if ((i === (this.getNumberOfWeeks() - 1)) && (j > (this.lastDayOfMonth + this.firstDayOfWeekOne) % 7 - 1)) {
                    week.push('');
                }
                else {
                    week.push(this.dayArr[j - 1]);
                }
            }
            month.push(week);
        }
        return month;
    };
    return MonthMap;
}());
var may = new MonthMap(6, 2024);
console.log(may.interateThroughWeek());
