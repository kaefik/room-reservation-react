let DataReserve = require("./datareserve");

let tstDataReserveRoom1 = [
  ["3-09-2018", "10:00", "Иванов И И"],
  ["6-09-2018", "16:00", "Сидоров Н Р"],
  ["3-09-2018", "17:00", "Иванов И И"],
  ["26-09-2018", "12:00", "Кириллов И И"],
  ["26-09-2018", "18:00", "Важенин П Р"],
  ["23-08-2018", "14:00", "Петров И И"],
  ["21-08-2018", "18:00", "Пунктинов И И"]
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

// для теста
let dataRoomReservationTst = [
  {
    nameroom: "комната 1",
    reserve: dataRoom1
  },
  {
    nameroom: "комната 2",
    reserve: dataRoom2
  }
];

// значения по умолчанию расписание бронирования переговорок
let dataRoomReservation = [
  {
    nameroom: "комната 1",
    reserve: new Array()
  },
  {
    nameroom: "комната 2",
    reserve: new Array()
  }
];

//console.log(dataRoomReservation);
//console.log(dataRoom2);

const createEmptySelectedVisibleWeekDays = function(countRoom) {
  // создание пустой структуры для отображения на экране
  if (countRoom <= 0) return [];
  console.log("countRoom = ", countRoom);
  let newSelected = new Array(countRoom);
  //newSelected[0] = [];

  for (let index = 0; index < newSelected.length; index++) {
    newSelected[index] = [];
    for (let index2 = 0; index2 < 5; index2++) {
      newSelected[index][index2] = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
    }
  }

  console.log("newSelected = ", newSelected);
  return newSelected;
};

const timeArray = [
  ["09", "00"],
  ["10", "00"],
  ["11", "00"],
  ["12", "00"],
  ["13", "00"],
  ["14", "00"],
  ["15", "00"],
  ["16", "00"],
  ["17", "00"],
  ["18", "00"]
];

const generateSelectedVisibleWeekDays = function(
  dataReserverRooms,
  selectedVisibleWeekDays,
  currentDays,
  currentMonth,
  currentYear
) {
  // генерация из структуры занятых дней конкретных переговорок для отображения в видимой части данных
  let newSelectedVisibleWeekDays = selectedVisibleWeekDays;
  dataReserverRooms.forEach((room, indexroom) => {
    //console.log("room = ", room);
    currentDays.forEach((dd, indexdd) => {
      //console.log("dd = ", dd);
      const reserve = room.reserve;
      reserve.forEach(obj => {
        //console.log("obj.date = ", obj.year, obj.month, obj.day);
        if (
          // фильтрация даты
          obj.year === currentYear &&
          obj.month === currentMonth &&
          obj.day === dd
        ) {
          console.log("filtered day ", obj.year, obj.month, dd);
          timeArray.forEach((tt, indextt) => {
            if (obj.hour === tt[0] && obj.minutes === tt[1]) {
              newSelectedVisibleWeekDays[indexroom][indexdd][indextt] = true;
            }
          });
        }
      });
    });
  });

  //console.log("newSelectedRoom = ", newSelectedRoom);
  //console.log("newSelectedVisibleWeekDays = ", newSelectedVisibleWeekDays);

  return newSelectedVisibleWeekDays;
};

const createDataReserveObjFromSelectedArray = (date, time, descr, selected) => {
  // создание объекта DataReserve в зависимости от значения selected
  console.log(
    "createDataReserveObjFromSelectedArray parameters = ",
    date,
    time,
    descr,
    selected
  );
  if (selected === false) {
    // TODO: в дальнейшем если нужно будет обработать отмену бронирования переговорки,
    //         то нужно будет тут изменить логику, а может быть и до вызова данной функции
    return undefined;
  }

  return new DataReserve(date, time, descr);
};

/* работа с LocalStorage */
const saveDataRoomReservationToLocalStorage = obj => {
  // сохранение dataRoomReservation в localStorage, true - если удачно
  obj.forEach((room, indexroom) => {
    let serialRoomObj = JSON.stringify(room);
    try {
      localStorage[indexroom.toString()] = serialRoomObj;
    } catch (error) {
      return false;
    }
  });
  return true;
};

const loadDataRoomReservationFromLocalStorage = () => {
  // загрузка dataRoomReservation из localStorage, возвращает объект.
  // при ошибке выдается undefined
  let flag = true;
  let index = 0;
  let arrayDataRoomReservation = new Array();
  while (flag) {
    const obj = localStorage[index];
    if (obj === undefined) {
      flag = false;
      console.log("flag = ", flag);
    } else {
      arrayDataRoomReservation[arrayDataRoomReservation.length] = JSON.parse(
        obj
      );
    }
    index = index + 1;
  }
  console.log("arrayDataRoomReservation = ", arrayDataRoomReservation);

  /* преобразование простых объектов Object расписания в  DataReserve*/
  for (let index = 0; index < arrayDataRoomReservation.length; index++) {
    for (let i = 0; i < arrayDataRoomReservation[index].reserve.length; i++) {
      const date = arrayDataRoomReservation[index].reserve[i].date;
      const time = arrayDataRoomReservation[index].reserve[i].time;
      const desc = arrayDataRoomReservation[index].reserve[i].description;
      arrayDataRoomReservation[index].reserve[i] = new DataReserve(
        date,
        time,
        desc
      );
    }
  }
  console.log("arrayDataRoomReservation = ", arrayDataRoomReservation);
  if (arrayDataRoomReservation.length === 0) {
    return undefined;
  }
  return arrayDataRoomReservation;
};

/* END работа с LocalStorage */

const testSelectedWeekDays = [
  [
    [
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ]
  ],
  [
    [
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      true
    ]
  ]
];

export {
  dataRoomReservation,
  testSelectedWeekDays,
  createEmptySelectedVisibleWeekDays,
  generateSelectedVisibleWeekDays,
  createDataReserveObjFromSelectedArray,
  timeArray,
  saveDataRoomReservationToLocalStorage,
  loadDataRoomReservationFromLocalStorage
};
