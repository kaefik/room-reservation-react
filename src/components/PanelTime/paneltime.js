import React, { Component } from "react";
import "./paneltime.css";
import ButtonTime from "../ButtonTime/buttontime";

//let dataRoomReserver = require("../../data/test_data");

class PanelTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:
        props.selected === undefined
          ? [
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
          : props.selected
    };
  }

  render() {
    //console.log("dataRoomReserver = ", dataRoomReserver);
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
    const timeArrayLeft = timeArray.slice(0, 5);
    const timeArrayRight = timeArray.slice(5);
    const buttonTimeItemsLeft = timeArrayLeft.map((time, index) => (
      <ButtonTime
        hour={time[0]}
        minute={time[1]}
        selected={this.state.selected[index]}
        key={index}
      />
    ));
    const buttonTimeItemsRight = timeArrayRight.map((time, index) => (
      <ButtonTime
        hour={time[0]}
        minute={time[1]}
        selected={this.state.selected[5 + index]}
        key={index}
      />
    ));
    //console.log("timeArray = ", this.state.timeArray);
    return (
      <div className="paneltime">
        <div className="paneltime-left">{buttonTimeItemsLeft}</div>
        <div className="paneltime-right">{buttonTimeItemsRight}</div>
      </div>
    );
  }
}

export default PanelTime;
