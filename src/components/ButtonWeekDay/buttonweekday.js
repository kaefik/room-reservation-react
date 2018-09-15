import React, { Component } from "react";
import "./buttonweekday.css";

const checkEmpltyMondayFriday = function(weekday) {
  /* true - если ПН до ПТ пустые дни */
  if (weekday[0] + weekday[1] + weekday[2] + weekday[3] + weekday[4] === 0) {
    return true;
  }
  return false;
};

class ButtonWeekDay extends Component {
  handleBackMonth = event => {
    var currentWeek = this.props.week - 1;

    currentWeek = currentWeek < 0 ? 0 : currentWeek;
    currentWeek = checkEmpltyMondayFriday(this.props.days[currentWeek])
      ? currentWeek + 1
      : currentWeek;

    this.props.onChangeWeek(currentWeek);
  };

  handleForwardMonth = event => {
    var currentWeek = this.props.week + 1;
    const countWeek = this.props.days.length;
    currentWeek = currentWeek < countWeek ? currentWeek : countWeek - 1;

    this.props.onChangeWeek(currentWeek);
  };

  render() {
    return (
      <div className="buttonweekday">
        <div className="buttonweekday-arrow" onClick={this.handleBackMonth}>
          &larr;
        </div>
        {console.info(this.props.week)}
        {console.info(this.props.days)}
        <div className="buttonweekday-day">
          {this.props.days[this.props.week][0]} Monday
        </div>
        <div className="buttonweekday-day">
          {this.props.days[this.props.week][1]} Tuesday
        </div>
        <div className="buttonweekday-day">
          {this.props.days[this.props.week][2]} Wednesday
        </div>
        <div className="buttonweekday-day">
          {this.props.days[this.props.week][3]} Thursday
        </div>
        <div className="buttonweekday-day">
          {this.props.days[this.props.week][4]} Friday
        </div>
        <div className="buttonweekday-arrow" onClick={this.handleForwardMonth}>
          &rarr;
        </div>
      </div>
    );
  }
}

export { ButtonWeekDay, checkEmpltyMondayFriday };
