import React from "react";
import Square from "./Square";
import "./index.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player1Turn: true
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    let squares = this.state.squares.slice();
    if (this.state.player1Turn) {
      squares[i] = "X";
    }
    this.setState(
      {
        squares: squares,
        player1Turn: !this.state.player1Turn
      },
      i => this.botMove(i)
    );
  }

  botMove(i) {
    let squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[squares.findIndex(elem => elem === null)] = "O";
    this.setState({
      squares: squares,
      player1Turn: !this.state.player1Turn
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  calculateTie(squares) {
    let win = this.calculateWinner(squares);
    let moveLeft = squares.findIndex(elem => elem === null);
    if (moveLeft === -1 && win === null) {
      return 1;
    }
    return null;
  }

  resetGame() {
    const squares = Array(9).fill(null);
    this.setState({ squares: squares, player1Turn: true });
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    const tie = this.calculateTie(this.state.squares);
    let status = "";
    if (winner) {
      status = "Winner : " + winner;
    } else if (tie) {
      status = "This match is a tie";
    } else {
      status = "Next Player:" + (this.state.player1Turn ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    );
  }
}

export default Board;
