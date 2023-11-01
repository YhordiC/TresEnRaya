import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants/constants'
import { Square } from './components/Square'
import WinnerGame from './components/WinnerGame'
import { checkEndGame,checkWinner } from './logic/board.js'



function App() {
  const  [board, setBoard] = useState(()=> {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)}) // 


  const [turn,setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ??  TURNS.x})  // null o undefined 
  const [winner,setWinner] = useState(null); 

 
  
 
  const updateBoard = (index) => {

    // si hay algo en esa posicion
    // entonces no sobre escribas
    if(board[index] || winner) return

// puedes utilizr structuredClone para una clonancion mas profunda.
   const newBoard = [...board] // una clonacion superficial de nuestra prop
   newBoard[index] = turn;
   setBoard(newBoard);
// cambiar turno 
   const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
   setTurn(newTurn);
   //guardar partida
   window.localStorage.setItem('board', JSON.stringify(newBoard));
   window.localStorage.setItem('turn', newTurn);
   // revisamos si hay un ganador
   const newWinner = checkWinner(newBoard);
   if(newWinner){
    confetti();
    setWinner(newWinner);
   } else if(checkEndGame(newBoard)){
    setWinner(false);
   }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index}
               index={index}
               updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className='turn'> 
        <Square isSelected= {turn === TURNS.x }>
          {TURNS.x}
        </Square>

        <Square isSelected= {turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>

      <WinnerGame winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
