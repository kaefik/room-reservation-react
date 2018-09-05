import React, { Component } from 'react';
import './buttontime.css'

class ButtonTime extends Component {
    state = { 
        selected: false // true - дата выбрана и кнопка выбора исчезает
     }
    render() { 
        const {hour, minute} = this.props;
        const selected = this.state.selected;
        return ( 
            <div className="buttontime">
                {hour}:{minute}
                {selected?(<div></div>):(<div>+</div>)}
            </div>
         );
    }
}
 
export default ButtonTime;