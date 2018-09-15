import React, { Component } from "react";

import PanelWeekDay from "../PanelWeekDay/panelweekday";
import PanelTime from "../PanelTime/paneltime";

import "./tableroomreserve.css";

var dataReserverRooms = require("../../data/test_data");

class TableRoomReserve extends Component {
  constructor(props) {
    super(props);
    //TODO: загрузка данных из хранилища
    this.state = {
      week: props.week === undefined ? 0 : parseInt(props.week, 10),
      month: props.month === undefined ? 0 : parseInt(props.month, 10), // 0 -> January, 1 ->Febriary ...
      year: props.year === undefined ? 2018 : parseInt(props.year, 10)
    };
  }

  render() {
    const dataReserverRoomsRender = dataReserverRooms.map((item, index) => (
      <div className="room" key={index}>
        <div className="room-caption">{item.nameroom}</div>
        <div className="room-time">
          <PanelTime />
          <PanelTime />
          <PanelTime />
          <PanelTime />
          <PanelTime />
        </div>
      </div>
    ));

    console.log(dataReserverRooms);

    return (
      <div className="table-room-reserve">
        <div className="table-room-reserve-caption">
          <div>Комната</div>
          <div className="table-room-reserve-panelweekday">
            <PanelWeekDay month={this.state.month} year={this.state.year} />
          </div>
        </div>

        {dataReserverRoomsRender}
      </div>
    );
  }
}

export default TableRoomReserve;
