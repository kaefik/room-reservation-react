import React, { Component } from 'react';
import './panelweekday.css'
import ButtonMonth from '../ButtonMonth/buttonmonth';


var classNames = require('classnames');
var moment = require('moment');

class PanelWeekDay extends Component {
    state = {  }
    render() { 
        return ( 
            <ButtonMonth month="2"/>
         );
    }
}
 
export default PanelWeekDay;