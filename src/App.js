import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonTime from './components/ButtonTime/buttontime';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonTime hour="9" minute="00"/>
        <ButtonTime hour="10" minute="00"/>
        <ButtonTime hour="11" minute="00"/>
        
      </div>
    );
  }
}

export default App;
