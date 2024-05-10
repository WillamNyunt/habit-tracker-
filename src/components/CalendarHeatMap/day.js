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
        return Math.ceil(daysInMonth / 7);
    };
    MonthMap.prototype.getLastDayOfMonth = function () {
        return new Date(this.firstDay.getFullYear(), this.firstDay.getMonth() + 1, 0).getDate();
    };
    MonthMap.prototype.getFirstDayOfTheMonth = function () {
        return this.firstDay.getDay();
    };
    /**
    * This function will iterate through the days of the month and return an array of dates
    */
    MonthMap.prototype.getDaysOfMonthArray = function () {
        var month = [];
        for (var i = 1; i < this.getDaysInMonth() + 1; i++) {
            var date = new Date("".concat(this.firstDay.getFullYear(), "-").concat(this.firstDay.getMonth() + 1, "-").concat(i));
            month.push(date);
        }
        return month;
    };
    MonthMap.prototype.formMonthDayMatrix = function () {
        var _this = this;
        var Month = this.getDaysOfMonthArray();
        var matrix = [];
        Month.forEach(function (day, index) {
            if (index % 7 === 0) {
                matrix.push({ day: _this.dayArr[day.getDay()],
                    date: day });
            }
            else {
                matrix.push({ day: _this.dayArr[day.getDay()],
                    date: day });
            }
        });
        return matrix;
    };
    return MonthMap;
}());
var may = new MonthMap(1, 2024);
console.log(may.formMonthDayMatrix());
