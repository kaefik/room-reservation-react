import React, { Component } from "react";
import "./panelweekday.css";
import ButtonMonth from "../ButtonMonth/buttonmonth";
import ButtonWeekDay from "../ButtonWeekDay/buttonweekday";

var classNames = require("classnames");
var moment = require("moment");

class PanelWeekDay extends Component {
  state = {
    week: this.props.week === undefined ? 0 : parseInt(this.props.week),
    month: this.props.month === undefined ? 0 : parseInt(this.props.month),  // 0 -> January, 1 ->Febriary ...
    year: this.props.year === undefined ? 2018 : parseInt(this.props.year)
  };
  render() {
    return (
      <div className="panelweekday">
        <ButtonMonth month= {this.state.month} year = {this.state.year} />
        <ButtonWeekDay month= {this.state.month} year = {this.state.year} week={this.state.week}/>
      </div>
    );
  }
}

export default PanelWeekDay;
