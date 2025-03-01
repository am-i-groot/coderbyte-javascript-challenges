/*

React Tic Tac Toe

We provided some simple React template code. Your goal is to create a functioning Tic Tac Toe game. It should work the following way: 
the first player to go places an X anywhere on the board by clicking a square, and then the next player will be able to place an O, 
and it continues alternating like this every turn.

You should also implement a function to determine if any player won by getting 3 X's or O's in a diagonal, horizontal, or vertical row. 
If there is a winner, display a message at the top. If nobody wins, then do not display any message. 
Finally, you should also implement the reset function that resets the entire board. 
You should also not be able to override the other players move during the game.

You are free to add classes and styles, but make sure you leave the component ID's and classes provided as they are.

Submit your code once it is complete and our system will validate your output.

*/

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white'
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid'
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

function Square({ value, onClick }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

function Board({ squares, onClick, resetGame, winner, nextPlayer }) {
  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />
  );

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{nextPlayer}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner || 'None'}</span>
      </div>
      <button style={buttonStyle} onClick={resetGame}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    // Ignore click if square is already filled or there's a winner
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    checkWinner(newSquares);
  };

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={handleClick}
          resetGame={resetGame}
          winner={winner}
          nextPlayer={isXNext ? 'X' : 'O'}
        />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
