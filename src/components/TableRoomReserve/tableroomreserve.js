import React, { Component } from "react";

import { PanelWeekDay, generateMonth } from "../PanelWeekDay/panelweekday";
import PanelTime from "../PanelTime/paneltime";

import "./tableroomreserve.css";
import { checkEmpltyMondayFriday } from "../ButtonWeekDay/buttonweekday";

import {
  dataRoomReservation,
  createEmptySelectedVisibleWeekDays,
  generateSelectedVisibleWeekDays,
  saveDataRoomReservationToLocalStorage,
  loadDataRoomReservationFromLocalStorage
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
    this.dataReserverRooms = loadDataRoomReservationFromLocalStorage();
    /*
    console.log(
      "constructor this.dataReserverRooms  = ",
      this.dataReserverRooms
    );*/
    if (this.dataReserverRooms === undefined) {
      // если нет данных в localStorage, то загружаются данные по умолчанию для теста
      this.dataReserverRooms = dataRoomReservation;
    }
    this.state.week = checkEmpltyMondayFriday(this.state.days[0]) ? 1 : 0;

    // тест для сохранения данных
    //saveDataRoomReservationToLocalStorage(this.dataReserverRooms);
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

  handleChangeSelected = (currentRoom, objDataReserve) => {
    // события изменения которые произошли в дочернем теге PanelTime
    // currentRoom - имя текущей комнаты
    // objDataReserve - объект типа DataReserve в котором содержится информация
    // о новом резерве переговорки
    console.log(
      "TableRoomReserve handleChangeSelected = ",
      currentRoom,
      objDataReserve
    );

    //TODO: сделать сохранение полученного измененного состояния в this.dataReserverRooms
    for (let index = 0; index < this.dataReserverRooms.length; index++) {
      const element = this.dataReserverRooms[index];
      if (element.nameroom === currentRoom) {
        console.log("handleChangeSelected = ", element);
        this.dataReserverRooms[index].reserve[
          this.dataReserverRooms[index].reserve.length
        ] = objDataReserve;
        //TODO: здесь сделать сохранение в localStorage
        saveDataRoomReservationToLocalStorage(this.dataReserverRooms);
      }
    }
    this.forceUpdate(); // TODO: не нравится что нужно насильно обновлять все элементы на экране.
  };

  render() {
    const selectedWeekDays = createEmptySelectedVisibleWeekDays(
      this.dataReserverRooms.length
    );

    generateSelectedVisibleWeekDays(
      this.dataReserverRooms,
      selectedWeekDays,
      this.state.days[this.state.week],
      this.state.month,
      this.state.year
    );

    //console.log("TableRoomReserve selectedWeekDays = ", selectedWeekDays);
    /*
    console.log(
      "this.state.days[this.state.week] = ",
      this.state.days[this.state.week]
    );*/

    const dataReserverRoomsRender = this.dataReserverRooms.map(
      (item, index) => (
        <div className="room" key={index}>
          <div className="room-caption">{item.nameroom}</div>
          <div className="room-time">
            {selectedWeekDays[index].map(
              (item2, index2) =>
                this.state.days[this.state.week][index2] !== 0 ? (
                  <PanelTime
                    onChangeSelected={this.handleChangeSelected}
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
                      (parseInt(this.state.month, 10) + 1).toString() +
                      "-" +
                      this.state.year
                    ).toString()}
                  />
                ) : (
                  <div className="room-time-empty" key={index2} /> // TODO: сделать чтобы был пустой блок в полный размер обычного блока
                )
            )}
          </div>
        </div>
      )
    );

    console.log("dataReserverRooms = ", this.dataReserverRooms);
    //console.log("STATE (TableRoomReerve) = ", this.state);

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
