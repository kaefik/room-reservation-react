import React, { Component } from "react";
import "./panelweekday.css";
import ButtonMonth from "../ButtonMonth/buttonmonth";
import {
  ButtonWeekDay,
  checkEmpltyMondayFriday
} from "../ButtonWeekDay/buttonweekday";

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
      days: generateMonth(this.props.month + 1, this.props.year)
    };
  }

  onChangeMonth = newMonth => {
    this.setState({
      days: generateMonth(newMonth + 1, this.props.year)
    });

    let newWeek = checkEmpltyMondayFriday(this.state.days[0]) ? 1 : 0;

    this.props.onChange(newMonth, this.props.year, newWeek);
  };

  onChangeWeek = newWeek => {
    //this.setState({ week: newWeek });
    this.props.onChange(this.props.month, this.props.year, newWeek);
  };

  render() {
    console.info("STATE PanelWeekDay = ", this.state);
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
          days={this.state.days}
          onChangeWeek={this.onChangeWeek}
        />
      </div>
    );
  }
}

export default PanelWeekDay;
