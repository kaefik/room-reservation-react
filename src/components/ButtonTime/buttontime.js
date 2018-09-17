import React, { Component } from "react";
import "./buttontime.css";

var classNames = require("classnames");

class ButtonTime extends Component {
  handleClickSelect = event => {
    const { hour, minute } = this.props;
    this.props.onClick(hour, minute, true);
  };

  render() {
    const { hour, minute } = this.props;
    const selected = this.props.selected;
    return (
      <div
        className={classNames("buttontime", {
          "buttontime-selected": selected
        })}
      >
        {hour}:{minute}
        {selected ? <div /> : <div onClick={this.handleClickSelect}>+</div>}
      </div>
    );
  }
}

export default ButtonTime;
