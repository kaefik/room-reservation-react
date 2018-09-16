import React, { Component } from "react";

import { PanelWeekDay, generateMonth } from "../PanelWeekDay/panelweekday";
import PanelTime from "../PanelTime/paneltime";

import "./tableroomreserve.css";
import { checkEmpltyMondayFriday } from "../ButtonWeekDay/buttonweekday";

//var dataReserverRooms = require("../../data/test_data");
import {
  dataRoomReservation,
  testSelectedWeekDays
} from "../../data/test_data";

class TableRoomReserve extends Component {
  constructor(props) {
    super(props);
    //TODO: загрузка данных из хранилища
    this.state = {
      week: props.week === undefined ? 0 : parseInt(props.week, 10),
      month: props.month === undefined ? 0 : parseInt(props.month, 10), // 0 -> January, 1 ->Febriary ...
      year: props.year === undefined ? 2018 : parseInt(props.year, 10),
      days: []
    };
    this.state.days = generateMonth(this.state.month + 1, this.state.year);
    this.dataReserverRooms = dataRoomReservation;
    this.state.week = checkEmpltyMondayFriday(this.state.days[0]) ? 1 : 0;
  }

  onChangeMonthWeek = (newmonth, newyear, newweek) => {
    let flag = false;
    let flagModifyMonth = false;
    let newDays = this.state.days;

    if (this.state.month !== newmonth) {
      this.setState({ month: newmonth });
      flag = true;
      flagModifyMonth = true;
    }

    if (this.state.year !== newyear) {
      this.setState({ year: newyear });
      flag = true;
    }

    if (flag) {
      newDays = generateMonth(newmonth + 1, newyear);
      this.setState({ days: newDays });
    }

    if (flagModifyMonth) {
      newweek = checkEmpltyMondayFriday(newDays[0]) ? 1 : 0;
      this.setState({ week: newweek });
    } else {
      if (this.state.week !== newweek) {
        this.setState({ week: newweek });
      }
    }
  };

  filteredWeekDays = (allWeekDays, currentDays, currentMonth, currentYear) => {
    // фильтрует из структуры расписания когда и во сколько  заняты переговорки и
    // генерация видимой части занято/незанято переговорка
    var newSelectedWeekDays = Array(allWeekDays.length);
    newSelectedWeekDays = newSelectedWeekDays.map(element => {
      element.push([]);
    });

    console.log("Current Date = ", currentDays, currentMonth, currentYear);
    allWeekDays.forEach((element, index1) => {
      element.reserve.forEach((item, index2) => {
        // фильтрация дат которые входят в текущие даты которые показываются на экране
        //console.log("Item = ", item);
        if (item.year === currentYear && item.month === currentMonth) {
          // TODO: сделать фильрацию по числу дня
          if (
            currentDays.find(item1 => {
              return item1 === item.day;
            }) !== undefined
          ) {
            /*
            console.log("filtered Item = ", item);
            console.log("newSelectedWeekDays == ", newSelectedWeekDays);*/
            if (newSelectedWeekDays[index1] === undefined) {
              newSelectedWeekDays[index1] = [];
            }
            const len = newSelectedWeekDays[index1].length;
            newSelectedWeekDays[index1][len] = item;
          }
        }
      });
    });
    console.log("newSelectedWeekDays = ", newSelectedWeekDays);
    return newSelectedWeekDays;
  };

  generateWeekDays = (allWeekDays, currentDays, currentMonth, currentYear) => {
    // генерация видимой части занято/незанято переговорка
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
    let newSelected = [];
    allWeekDays.forEach((element, index) => {
      if (newSelected[index] === undefined) {
        newSelected[index] = [];
      }
      currentDays.slice(0, 5).forEach((dd, index1) => {
        timeArray.forEach((tt, index2) => {
          if (newSelected[index][index1] === undefined) {
            newSelected[index][index1] = [];
          }
          //TODO: сделать проверку на дату которая зарезервирована переговорка
          newSelected[index][index1][index2] = undefined;
        });
      });
    });

    console.log("newSelected = ", newSelected);
    return newSelected;
  };

  render() {
    //const selectedWeekDays = testSelectedWeekDays; // TODO: сгенирировать данную структуру используя this.dataReserverRooms
    const filteredSelectedWeekDays = this.filteredWeekDays(
      this.dataReserverRooms,
      this.state.days[this.state.week],
      this.state.month,
      this.state.year
    );

    const selectedWeekDays = this.generateWeekDays(
      filteredSelectedWeekDays,
      this.state.days[this.state.week],
      this.state.month,
      this.state.year
    );

    const dataReserverRoomsRender = this.dataReserverRooms.map(
      (item, index) => (
        <div className="room" key={index}>
          <div className="room-caption">{item.nameroom}</div>
          <div className="room-time">
            {selectedWeekDays[index].map(
              (item2, index2) =>
                this.state.days[this.state.week][index] !== 0 ? (
                  <PanelTime
                    room={item.nameroom}
                    selected={item2}
                    key={(
                      this.state.days[this.state.week][index2] +
                      "-" +
                      this.state.month +
                      "-" +
                      this.state.year
                    ).toString()}
                    id={(
                      this.state.days[this.state.week][index2] +
                      "-" +
                      this.state.month +
                      "-" +
                      this.state.year
                    ).toString()}
                  />
                ) : (
                  <div /> // TODO: сделать чтобы был пустой блок в полный размер обычного блока
                )
            )}
          </div>
        </div>
      )
    );

    // console.log("dataReserverRooms = ", this.dataReserverRooms);
    console.log("STATE (TableRoomReerve) = ", this.state);

    return (
      <div className="table-room-reserve">
        <div className="table-room-reserve-caption">
          <div>Комната</div>
          <div className="table-room-reserve-panelweekday">
            <PanelWeekDay
              month={this.state.month}
              year={this.state.year}
              week={this.state.week}
              days={this.state.days}
              onChange={this.onChangeMonthWeek}
            />
          </div>
        </div>

        {dataReserverRoomsRender}
      </div>
    );
  }
}

export default TableRoomReserve;
