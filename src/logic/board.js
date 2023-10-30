 import { COMBOwinner } from "../constants/constants";

 export const checkWinner = (boardToCheck) => { // chequea los combos para mostrar al ganador
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

  export const checkEndGame = (newBoard) =>{
    // revisamos si hay un empate
    // si no hay mas especios vacios en el tablero
    
    return newBoard.every((square) => square != null)
  }

  