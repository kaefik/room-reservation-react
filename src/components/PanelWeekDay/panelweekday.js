import React, { Component } from "react";
import "./panelweekday.css";
import ButtonMonth from "../ButtonMonth/buttonmonth";
import { ButtonWeekDay } from "../ButtonWeekDay/buttonweekday";

var moment = require("moment");

const generateMonth = (month, year) => {
  const dates = year.toString() + "-" + month.toString();
  const dayMonth = moment(dates, "YYYY-MM").daysInMonth();
  console.info(dates);
  console.info(dayMonth);
  let calendarMonth = [];
  let numWeek = -1;
  for (let index = 1; index < dayMonth + 1; index++) {
    const dateCurrent = dates + "-" + index.toString();
    const dayWeek = moment(dateCurrent, "YYYY-MM-DD").isoWeekday();
    if (numWeek === -1) {
      calendarMonth.push([0, 0, 0, 0, 0, 0, 0]);
      numWeek = numWeek + 1;
      calendarMonth[numWeek][dayWeek - 1] = index;
    } else {
      if (dayWeek === 1) {
        calendarMonth.push([0, 0, 0, 0, 0, 0, 0]);
        numWeek = numWeek + 1;
      }
      calendarMonth[numWeek][dayWeek - 1] = index;
    }
  }
  return calendarMonth;
};

class PanelWeekDay extends Component {
  onChangeMonth = newMonth => {
    this.props.onChange(newMonth, this.props.year, this.props.week);
  };

  onChangeWeek = newWeek => {
    this.props.onChange(this.props.month, this.props.year, newWeek);
  };

  render() {
    return (
      <div className="panelweekday">
        <ButtonMonth
          month={this.props.month}
          onChangeMonth={this.onChangeMonth}
        />
        <ButtonWeekDay
          month={this.props.month}
          year={this.props.year}
          week={this.props.week}
          days={this.props.days}
          onChangeWeek={this.onChangeWeek}
        />
      </div>
    );
  }
}

export { PanelWeekDay, generateMonth };
