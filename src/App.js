import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import TableRoomReserve from "./components/TableRoomReserve/tableroomreserve";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Бронирование переговорок</h1>
        </header>
        <TableRoomReserve month="8" />
      </div>
    );
  }
}

export default App;
