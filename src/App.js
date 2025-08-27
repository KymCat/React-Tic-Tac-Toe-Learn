import { useState } from "react";

/*
  JSX = javaScript + XML
  컴포넌트 = JSX를 반환하는 함수
  컴포넌트를 활용하면 재사용성과 유지보수 용이
*/
function Square({value, onSquareClick}) {
  
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // 사각형이 채워져있거나, 이겼으면 종료
    if (squares[i] || calculateWinner(squares)) 
      return;

    /*
      .slice() 배열 깊은 복사
      리액트는 setSquares에 새로운 참조가 전달될 때만 렌더링을 다시 해줌
    */
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner)
    status = "Winner: " + winner;
  else 
    status = "Next player: " + (xIsNext ? "X" : "O");

  return (
    /*
      리액트는 단일 JSX 엘리멘트를 반환 해야하기 때문에
      <></> 혹은 <div></div> 로 감싸서 반환
    */

    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  // xIsNext : 다음 플레이어를 결정하기 위한 값(O,X)
  // history : 게임 타임라인
  // currentMove : 현재 보고있는 단계(턴)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // 현재 턴  squares배열

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); // 타임라인 추가
    setCurrentMove(nextHistory.length-1);
  }

  // 타임라인 점프
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) 
      description = "Go to move #" + move;
    else 
      description = "Go to move start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // 승리하는 경우 : 가로, 세로, 대각선

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  
  }

  return null;
}
