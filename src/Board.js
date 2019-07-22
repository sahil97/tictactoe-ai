import React from "react";
import Square from "./Square";
import "./index.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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

  minimax(newBoard, player) {
    let huPlayer = "X";
    let aiPlayer = "O";

    let availSpots = this.emptyIndexies(newBoard);

    if (this.calculateWinner(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (this.calculateWinner(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
      let result;
      if (player === aiPlayer) {
        result = this.minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        result = this.minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  botMove(i) {
    let squares = this.state.squares.slice();
    if (
      this.calculateWinner(squares, "X") ||
      this.calculateWinner(squares, "O") ||
      squares[i]
    ) {
      return;
    }
    let bestMove = this.minimax(squares, "O");
    let dumbMove = this.emptyIndexies(squares)[0];
    squares[bestMove.index] = "O";
    this.setState({
      squares: squares,
      player1Turn: !this.state.player1Turn
    });
  }

  // calculateWinner(squares) {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];
  //     if (
  //       squares[a] &&
  //       squares[a] === squares[b] &&
  //       squares[a] === squares[c]
  //     ) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // }

  calculateWinner(squares, player) {
    if (
      (squares[0] === player &&
        squares[1] === player &&
        squares[2] === player) ||
      (squares[3] === player &&
        squares[4] === player &&
        squares[5] === player) ||
      (squares[6] === player &&
        squares[7] === player &&
        squares[8] === player) ||
      (squares[0] === player &&
        squares[3] === player &&
        squares[6] === player) ||
      (squares[1] === player &&
        squares[4] === player &&
        squares[7] === player) ||
      (squares[2] === player &&
        squares[5] === player &&
        squares[8] === player) ||
      (squares[0] === player &&
        squares[4] === player &&
        squares[8] === player) ||
      (squares[2] === player && squares[4] === player && squares[6] === player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  calculateTie(squares) {
    let winX = this.calculateWinner(squares, "X");
    let winO = this.calculateWinner(squares, "O");
    let moveLeft = this.emptyIndexies(squares);
    if (!moveLeft.length && !winX && !winO) {
      return 1;
    }
    return null;
  }

  resetGame() {
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.setState({ squares: squares, player1Turn: true });
  }

  emptyIndexies(squares) {
    return squares.filter(s => s !== "O" && s !== "X");
  }

  render() {
    const winnerX = this.calculateWinner(this.state.squares, "X");
    const winnerO = this.calculateWinner(this.state.squares, "O");
    const tie = this.calculateTie(this.state.squares);
    let status = "";
    if (winnerX) {
      status = "Winner : X";
    } else if (winnerO) {
      status = "Winner : O";
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
