import React, { Component } from 'react';
import './buttonweekday.css'

var classNames = require('classnames');
var moment = require('moment');

class ButtonWeekDay extends Component {
    state = { 
        days: [1,2,3,4,5],
        month: 0
    }

    render() { 
        return ( 
            <div className="buttonweekday">
                <div>&larr;</div>
                <div>{this.state.days[0]} Monday</div>
                <div>{this.state.days[1]} Tuesday</div>
                <div>{this.state.days[2]} Wednesday</div>
                <div>{this.state.days[3]} Thursday</div>
                <div>{this.state.days[4]} Friday</div>
                <div>&rarr;</div>
            </div>
         );
    }
}
 
export default ButtonWeekDay;