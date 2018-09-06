import React, { Component } from 'react';
import './buttonmonth.css'

var classNames = require('classnames');
var moment = require('moment');

class ButtonMonth extends Component {
    state = { 
        month: 0  // нумерация месяцев с 0
    }

    handleBackMonth = event => {
        var currentMonth = this.state.month-1;

        this.setState({month: currentMonth<0?0:currentMonth});
    }

    handleForwardMonth = event => {
        var currentMonth = this.state.month+1;

        this.setState({month: currentMonth>11?11:currentMonth});        
    }

    
    render() { 
        const currentMonth = this.state.month;
        return (  
            <div className="buttonmonth">
                <div onClick={this.handleBackMonth}>Back</div>
                <div>{moment().month(currentMonth).format("MMMM")}</div>
                <div onClick={this.handleForwardMonth}>Forward</div>
                {console.info(this.state.month)}
            </div>
        );
    }
}
 
export default ButtonMonth;