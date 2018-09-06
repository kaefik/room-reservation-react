import React, { Component } from 'react';
import './buttontime.css'

var classNames = require('classnames');

class ButtonTime extends Component {
    state = { 
        selected: false // true - дата выбрана и кнопка выбора исчезает
    }

    handleClickSelect = event => {
        this.setState({selected: true});
    }


    render() { 
        const {hour, minute} = this.props;
        const selected = this.state.selected;
        return ( 
            <div className={classNames("buttontime", {"buttontime-selected":selected})}>
                {hour}:{minute}
                {selected?(<div></div>):(<div onClick={this.handleClickSelect}>+</div>)}
            </div>
         );    
    }
}
 
export default ButtonTime;