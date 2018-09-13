import React, { Component } from "react";
import "./buttonmonth.css";

var classNames = require("classnames");
var moment = require("moment");

class ButtonMonth extends Component {
  /*
     this.props.onChangeMonth - возращает родителю текущий месяц
    */

  handleBackMonth = event => {
    let currentMonth = this.props.month - 1;
    currentMonth = currentMonth < 0 ? 0 : currentMonth;
    this.props.onChangeMonth(currentMonth);
  };

  handleForwardMonth = event => {
    let currentMonth = this.props.month + 1;
    currentMonth = currentMonth > 11 ? 11 : currentMonth;
    this.props.onChangeMonth(currentMonth);
  };

  render() {
    const currentMonth = this.props.month;
    return (
      <div className="buttonmonth">
        <div onClick={this.handleBackMonth}>&#9668;</div>
        <div className="buttonmonth-name">
          {moment()
            .month(currentMonth)
            .format("MMMM")}
        </div>
        <div onClick={this.handleForwardMonth}>&#9658;</div>
      </div>
    );
  }
}

export default ButtonMonth;
