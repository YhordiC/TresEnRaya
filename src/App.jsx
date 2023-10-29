import { useState } from 'react'
import './App.css'

const TURNS = {
  x:'x',
  o: 'o'}



const Square = ({children,isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () =>{
    updateBoard(index)
  }  
  return (
    <div className={className} 
    onClick={handleClick}>
      {children}
    </div>
  )
}

const COMBOwinner = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.x)
  const [winner,setWinner] = useState(null); 

  const checkWinner = (boardToCheck) => { // chequea los combos para mostrar al ganador
    for( const combo of COMBOwinner){ 
      const [a,b,c] = combo; // recuperamos los datos del combo
      if(boardToCheck[a]  // comparamos si los datos se parecen al del parametro 
        && boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c])
     {
      return boardToCheck[a]
    } 

  } 
  // si no hay ganador  retorna vacio
  return null;}
  
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
   // revisamos si hay un ganador
   const newWinner = checkWinner(newBoard);
   if(newWinner){
    setWinner(newWinner);
   }
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
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

      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false 
                  ? 'Empate' 
                  : 'Gano'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
