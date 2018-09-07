var moment = require("moment");
/*
console.info(
  moment()
    .month(13)
    .format("MMMM")
);

console.info(
  moment()
    .week(1)
    .format("YYYY-MM-DD")
);

console.info(moment("11-9-2018", "DD-MM-YYYY").format("d"));
*/

console.info(moment("7-9-2018", "DD-MM-YYYY").isoWeekday()); // определяет день недели


const generateMonth = (month, year) => {
  const dates = year.toString() +"-"+month.toString();  
  const dayMonth = moment(dates, "YYYY-MM").daysInMonth();
  console.info(dates);
  console.info(dayMonth);
  let calendarMonth = [];
  numWeek = -1;
  for (let index = 1; index < dayMonth+1; index++) {
    const dateCurrent =  dates +"-" + index.toString();
    const dayWeek = moment(dateCurrent, "YYYY-MM-DD").isoWeekday();
    if (numWeek === -1) {
      calendarMonth.push([0,0,0,0,0,0,0]);
      numWeek = numWeek + 1;
      calendarMonth[numWeek][dayWeek-1] = index;
    } else {
      if (dayWeek === 1) {
        calendarMonth.push([0,0,0,0,0,0,0]);
        numWeek = numWeek + 1;
      }
      calendarMonth[numWeek][dayWeek-1] = index;
    }
  }
  return calendarMonth;
}

console.info(generateMonth(9,2018));

