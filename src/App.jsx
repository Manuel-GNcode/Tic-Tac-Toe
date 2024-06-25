import { useState } from "react";
import { Square } from "./components/Square";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";
import confetti from "canvas-confetti";
import { icons, turns, winnerCombos } from "./consts/consts";

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [turn, setTurn] = useState(turns.x);
  const [winner, setWinner] = useState(null);
  const [rival, setRival] = useState({
    opp: ""
  })

  const checkWinner = (boardToCheck)=>{
    for (const combo of winnerCombos) {
      const [a,b,c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]==1?icons.x:icons.o;
      }
    }
    return null;
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(0));
    setTurn(turns.x);
    setWinner(null);
    setRival({
      opp: ""
    })
  }

  const checkEndGAme = (newBoard)=>{
    return newBoard.every(square=>square!=0);
  }

  const handleRival = ()=>{
    setRival({
      opp: "player"
    })
  }
  const handleBot = ()=>{
    setRival({
      opp: "bot"
    })
  }

  const playBot = (newTurn, cBoard, neWinner)=> {
    if (rival.opp != "bot" || newTurn != -2 || neWinner) return;

    const probability = Math.random() >= 0.2;
    let index = null;
    const newBoard = [...cBoard];
    const solutions = winnerCombos.filter(combo=>{
      const [a,b,c] = combo;
      return (
        newBoard[a]+newBoard[b]+newBoard[c]==2 ||
        newBoard[a]+newBoard[b]+newBoard[c]==-4
      )
    })
    if (solutions.length > 0 && probability) {
      index = solutions[0].filter(move=>newBoard[move]==0);
    } else {
      const posibleMoves = [];
      newBoard.forEach((move,i)=>{
        if (move==0) {
          posibleMoves.push(i);
        }
      })
      index = posibleMoves[Math.floor(Math.random())*posibleMoves.length];
    }
    newBoard[index] = turns.o;
    setBoard(newBoard);
    setTurn(turns.x);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti({
        spread: 180,
      });
      setWinner(newWinner);
    } else if (checkEndGAme(newBoard)) {
      setWinner(false);
    }
  }

  const updateBoard = (index)=>{
    if (board[index] || winner || !rival.opp) return;

    const newBoard = [...board];
    newBoard[index] = turn==1?turns.x:turns.o;
    setBoard(newBoard);

    const newTurn = turn == turns.x? turns.o: turns.x;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti({
        spread: 180,
      });
      setWinner(newWinner);
    } else if (checkEndGAme(newBoard)) {
      setWinner(false);
    }

    setTimeout(() => {
      playBot(newTurn, newBoard, newWinner)
    }, 200);
  }

  return (
    <main className="board">
      <p className="logo">{"<"} <b>GN</b>code {"/>"}</p>
      <h1>Tic tac toe</h1>

      <Board board={board} updateBoard={updateBoard}/>

      <section className={"btn-nav "+(!rival.opp?"":"hide")}>
        <button onClick={handleRival} className="btn vs-player">PvP</button>
        <button onClick={handleBot} className="btn vs-bot">Bot</button>
      </section>

      <section className={"turn "+(rival.opp?"":"hide")}>
        <Square isSelected={turn == turns.x?"is-selected-x":""}>
          {icons.x}
        </Square>
        <Square isSelected={turn == turns.o?"is-selected-o":""}>
          {icons.o}
        </Square>
      </section>

      <WinnerModal isSelected={turn == turns.x?"is-selected-o":"is-selected-x"} winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App;
