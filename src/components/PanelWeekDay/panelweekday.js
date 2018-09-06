import React, { Component } from 'react';
import './panelweekday.css'
import ButtonMonth from '../ButtonMonth/buttonmonth';
import ButtonWeekDay from '../ButtonWeekDay/buttonweekday'


var classNames = require('classnames');
var moment = require('moment');

class PanelWeekDay extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <ButtonMonth month="2"/>
                <ButtonWeekDay />
            </div>
         );
    }
}
 
export default PanelWeekDay;