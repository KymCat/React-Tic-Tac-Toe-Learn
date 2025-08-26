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

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice(); // .slice() 로 완전히 새로배열 할당
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return (
    /*
      리액트는 단일 JSX 엘리멘트를 반환 해야하기 때문에
      <></> 혹은 <div></div> 로 감싸서 반환
    */

    <>
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
