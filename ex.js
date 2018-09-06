var moment = require("moment");

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

console.info(moment("1-12-2018", "DD-MM-YYYY").isoWeekday()); // определяет день недели
