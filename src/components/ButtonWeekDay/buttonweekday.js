import React, { Component } from "react";
import "./buttonweekday.css";

var classNames = require("classnames");
var moment = require("moment");

const generateMonth = (month, year) => {
  const dates = year.toString() +"-"+month.toString();  
  const dayMonth = moment(dates, "YYYY-MM").daysInMonth();
  console.info(dates);
  console.info(dayMonth);
  let calendarMonth = [];
  let numWeek = -1;
  for (let index = 1; index < dayMonth+1; index++) {
    const dateCurrent =  dates +"-" + index.toString();
    const dayWeek = moment(dateCurrent, "YYYY-MM-DD").isoWeekday();
    if (numWeek === -1) {
      calendarMonth.push([0,0,0,0,0,0,0]);
      numWeek = numWeek + 1;
      calendarMonth[numWeek][dayWeek-1] = index;
    } else {
      if (dayWeek === 1) {
        calendarMonth.push([0,0,0,0,0,0,0]);
        numWeek = numWeek + 1;        
      }
      calendarMonth[numWeek][dayWeek-1] = index;
    }
  }
  return calendarMonth;
}


class ButtonWeekDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      week: 0,
      month: 8,
      year: 2018
    };

    this.state.days = generateMonth(this.state.month, this.state.year);

    this.state.week = this.checkEmpltyMondayFriday(this.state.days[this.state.week])?this.state.week+1:this.state.week;

  }

  checkEmpltyMondayFriday = (weekday) => {
    /* true - если ПН до ПТ пустые дни */
    if (weekday[0]+weekday[1]+weekday[2]+weekday[3]+weekday[4] ===0) {
      return true;
    }
    return false;
  }

  handleBackMonth = event => {
    var currentWeek = this.state.week - 1;

    currentWeek = this.checkEmpltyMondayFriday(this.state.days[currentWeek])?currentWeek+1:currentWeek;

    this.setState({week: currentWeek<0?0:currentWeek});
  }

  handleForwardMonth = event => {
    var currentWeek = this.state.week + 1;
    const countWeek = this.state.days.length;

    this.setState({week: currentWeek<countWeek?currentWeek:countWeek-1});
  }

  render() {
    return (
      <div className="buttonweekday">
        <div className="buttonweekday-arrow" onClick={this.handleBackMonth}>&larr;</div>
        {console.info(this.state.week)}
        {console.info(this.state.days)}
        <div className="buttonweekday-day">{this.state.days[this.state.week][0]} Monday</div>
        <div className="buttonweekday-day">{this.state.days[this.state.week][1]} Tuesday</div>
        <div className="buttonweekday-day">{this.state.days[this.state.week][2]} Wednesday</div>
        <div className="buttonweekday-day">{this.state.days[this.state.week][3]} Thursday</div>
        <div className="buttonweekday-day">{this.state.days[this.state.week][4]} Friday</div>
        <div className="buttonweekday-arrow" onClick={this.handleForwardMonth}>&rarr;</div>
      </div>
    );
  }
}


export default ButtonWeekDay;

