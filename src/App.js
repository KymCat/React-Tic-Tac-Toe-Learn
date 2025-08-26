/*
  JSX = javaScript + XML
  컴포넌트 = JSX를 반환하는 함수
  컴포넌트를 활용하면 재사용성과 유지보수 용이
*/
function Square() {
  return <button className="square">1</button>;
}

export default function Board() {
  return (
    /*
      리액트는 단일 JSX 엘리멘트를 반환 해야하기 때문에
      <></> 혹은 <div></div> 로 감싸서 반환
    */

    <>
      <div className="board-row">
        <Square /> 
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}
