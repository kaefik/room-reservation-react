var moment = require("moment");

class DataReserve {
  constructor(date, time, descr) {
    this.date = date; // дата бронирования формат даты DD-MM-YYYY
    this.time = time; // время бронирования, например 09:00
    if (descr === undefined) {
      this.description = "";
    } else {
      this.description = descr;
    }
  }

  get desc() {
    return this.description;
  }

  set desc(str) {
    this.description = str.toString();
  }

  cleardesc() {
    this.desc = "";
  }

  get year() {
    return moment(this.date, "DD-MM-YYYY").year();
  }

  get month() {
    // 0 - January,..., 11 - December
    return moment(this.date, "DD-MM-YYYY").month();
  }

  get day() {
    return moment(this.date, "DD-MM-YYYY").date();
  }

  get hour() {
    const hhmm = this.time.split(":");
    if (hhmm.length !== 2) {
      return undefined;
    }
    return hhmm[0];
  }

  get minutes() {
    const hhmm = this.time.split(":");
    if (hhmm.length !== 2) {
      return undefined;
    }
    return hhmm[1];
  }

  setDate(dd, mm, yy) {
    // true - если удалось изменить дату
    if (!(dd >= 1 && dd <= 31)) {
      return false;
    }
    if (!(mm >= 1 && mm <= 12)) {
      return false;
    }
    if (!(yy >= 1900)) {
      return false;
    }
    this.date = dd.toString() + "-" + mm.toString() + "-" + yy.toString();
    return true;
  }

  setTime(hh, mm) {
    if (!(hh >= 0 && hh <= 23)) {
      return false;
    }
    if (!(mm >= 0 && mm <= 59)) {
      return false;
    }
    this.time = hh.toString() + ":" + mm.toString();
    return true;
  }
}

/*  пример использования */
/*
var dataReserve = new DataReserve("20-12-2018", "09:00");
dataReserve.desc = "Сидоров В А";
console.log(dataReserve);
dataReserve.cleardesc();
console.log(dataReserve);
console.log(dataReserve.year);
console.log(dataReserve.month);
console.log(dataReserve.day);
dataReserve.setDate(1, 3, 2017);
console.log(dataReserve);
dataReserve.setTime(12, 56);
console.log(dataReserve);
console.log(dataReserve.hour);
console.log(dataReserve.minutes);
*/
module.exports = DataReserve;
