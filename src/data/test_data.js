let DataReserve = require("./datareserve");

let tstDataReserveRoom1 = [
  ["3-09-2018", "10:00", "Иванов И И"],
  ["6-09-2018", "16:00", "Сидоров Н Р"],
  ["3-09-2018", "17:00", "Иванов И И"],
  ["26-09-2018", "12:00", "Кириллов И И"],
  ["26-09-2018", "18:00", "Важенин П Р"],
  ["23-08-2018", "14:00", "Петров И И"]
];

let tstDataReserveRoom2 = [
  ["4-09-2018", "14:00", "Иванов И И"],
  ["7-09-2018", "10:00", "Сидоров Н Р"],
  ["13-09-2018", "17:00", "Павлюк И И"],
  ["26-09-2018", "15:00", "Кириллов И И"],
  ["25-09-2018", "18:00", "Важенин П Р"],
  ["28-08-2018", "14:00", "Петров И И"]
];

let dataRoom1 = tstDataReserveRoom1.map(
  item => new DataReserve(item[0], item[1], item[2])
);

let dataRoom2 = tstDataReserveRoom2.map(
  item => new DataReserve(item[0], item[1], item[2])
);

let dataRoomReservation = [
  {
    nameroom: "комната 1",
    reserve: tstDataReserveRoom1
  },
  {
    nameroom: "комната 2",
    reserve: tstDataReserveRoom2
  }
];

//console.log(dataRoomReservation);
//console.log(dataRoom2);

module.exports = dataRoomReservation;
