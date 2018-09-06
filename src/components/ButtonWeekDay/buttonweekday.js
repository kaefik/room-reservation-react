import React, { Component } from "react";
import "./buttonweekday.css";

var classNames = require("classnames");
var moment = require("moment");

class ButtonWeekDay extends Component {
  state = {
    days: [1, 2, 3, 4, 5],
    week: 1,
    month: 0,
    year: 2018
  };

  render() {
    return (
      <div className="buttonweekday">
        <div className="buttonweekday-arrow">&larr;</div>
        <div className="buttonweekday-day">{this.state.days[0]} Monday</div>
        <div className="buttonweekday-day">{this.state.days[1]} Tuesday</div>
        <div className="buttonweekday-day">{this.state.days[2]} Wednesday</div>
        <div className="buttonweekday-day">{this.state.days[3]} Thursday</div>
        <div className="buttonweekday-day">{this.state.days[4]} Friday</div>
        <div className="buttonweekday-arrow">&rarr;</div>
      </div>
    );
  }
}

export default ButtonWeekDay;
