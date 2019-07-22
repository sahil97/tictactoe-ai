import React, { Component } from "react";
import Game from "./Game";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game className="Game" />
        <footer class="footer">
          <p>
            Built by{" "}
            <a href="https://github.com/sahil97/tictactoe-ai">@Sahil Sharma</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
