import React, { Component } from "react";
import "./panelweekday.css";
import ButtonMonth from "../ButtonMonth/buttonmonth";
import {
  ButtonWeekDay,
  checkEmpltyMondayFriday
} from "../ButtonWeekDay/buttonweekday";

var classNames = require("classnames");
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
  constructor(props) {
    super(props);
    this.state = {
      week: this.props.week === undefined ? 0 : parseInt(this.props.week),
      month: this.props.month === undefined ? 0 : parseInt(this.props.month), // 0 -> January, 1 ->Febriary ...
      year: this.props.year === undefined ? 2018 : parseInt(this.props.year),
      days: []
    };
    this.state.days = generateMonth(this.state.month + 1, this.state.year);

    this.state.week = checkEmpltyMondayFriday(this.state.days[this.state.week])
      ? this.state.week + 1
      : this.state.week;
  }

  onChangeMonth = newMonth => {
    this.setState({ month: newMonth });

    this.setState({
      days: generateMonth(this.state.month + 1, this.state.year)
    });
    this.setState({
      week: checkEmpltyMondayFriday(this.state.days[0]) ? 1 : 0
    });
  };

  onChangeWeek = newWeek => {
    this.setState({ week: newWeek });
  };

  render() {
    console.info("state = ", this.state);
    return (
      <div className="panelweekday">
        <ButtonMonth
          month={this.state.month}
          onChangeMonth={this.onChangeMonth}
        />
        <ButtonWeekDay
          month={this.state.month}
          year={this.state.year}
          week={this.state.week}
          days={this.state.days}
          onChangeWeek={this.onChangeWeek}
        />
      </div>
    );
  }
}

export default PanelWeekDay;
