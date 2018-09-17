import React, { Component } from "react";
import "./paneltime.css";
import ButtonTime from "../ButtonTime/buttontime";

//import DataReserve from "../../data/datareserve";

//let dataRoomReserver = require("../../data/test_data");

class PanelTime extends Component {
  timeArray = [
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

  constructor(props) {
    super(props);
    this.state = {
      selected:
        props.selected === undefined
          ? [
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
            ]
          : props.selected
    };
  }

  setIndexSelectedinTime = (hour, minute, selected) => {
    this.timeArray.forEach((item, index) => {
      if (item[0] === hour && item[1] === minute) {
        const newSelected = this.state.selected;
        newSelected[index] = selected;
        this.setState({ selected: newSelected });
      }
    });
  };

  handleClick = (hour, minute, selected) => {
    console.log(
      "Click ROOM date time = ",
      this.props.room,
      this.props.id,
      hour + ":" + minute,
      selected
    );
    this.setIndexSelectedinTime(hour, minute, selected);
  };

  render() {
    //console.log("dataRoomReserver = ", dataRoomReserver);
    //const timeArray = this.generateTimeArray();
    const timeArrayLeft = this.timeArray.slice(0, 5);
    const timeArrayRight = this.timeArray.slice(5);
    const buttonTimeItemsLeft = timeArrayLeft.map((time, index) => (
      <ButtonTime
        hour={time[0]}
        minute={time[1]}
        selected={this.state.selected[index]}
        key={index}
        onClick={this.handleClick}
      />
    ));
    const buttonTimeItemsRight = timeArrayRight.map((time, index) => (
      <ButtonTime
        hour={time[0]}
        minute={time[1]}
        selected={this.state.selected[5 + index]}
        key={index}
        onClick={this.handleClick}
      />
    ));
    //console.log("timeArray = ", this.state.timeArray);
    //console.log("ID panelTime = ", this.props.id, this.props.room);
    return (
      <div className="paneltime">
        <div className="paneltime-left">{buttonTimeItemsLeft}</div>
        <div className="paneltime-right">{buttonTimeItemsRight}</div>
      </div>
    );
  }
}

export default PanelTime;
