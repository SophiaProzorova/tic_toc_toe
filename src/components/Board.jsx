import {useEffect, useState} from 'react'
import Square from './Square'
import {Patterns} from '../Patterns'

const Board = ({players}) => {
  const [nameOfLineClass, setNameOfLineClass] = useState('board');
  const [playerList, setPlayerList] = useState([{name:players[0], countOfWin:0, symbol:'X'}, {name:players[1], countOfWin:0, symbol:'O'}])

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  //current player
  const [player, setPlayer] = useState(playerList[0]);

  const [result, setResult] = useState({winner: 'none', state: 'none'})

  useEffect(() => {
    checkWin();

    checkIfTie();

    if (player == playerList[1]) setPlayer(playerList[0]);
    else setPlayer(playerList[1]);
  }, [board])

  useEffect(() => {
    setTimeout(()=>{
      if (result.state !== 'none'){
        alert(`Game Finished! Winning Player: ${result.winner}`)
     }
     
     restartGame()
    }, 20)
    
    
  }, [result])

  const chooseSquare = (square) => {

    setBoard(board.map((value, index) => {

      return (index === square && value === "") ? player.symbol : value

    }))

  };

  const checkWin = () => {
    Patterns.forEach((currentPatter) => {
      const firstPlayer = board[currentPatter[0]]
      if (firstPlayer == "") return;
      let foundwinningPattern = true
      var winnerPosition = [];
      currentPatter.forEach( index => {
        if (board[index] != firstPlayer) {
          foundwinningPattern = false
        }
        else winnerPosition.push(index)
      })
      if (foundwinningPattern) {
        

        //show red line
        winnerPosition.sort((a, b) => a-b);
        console.log(winnerPosition);
        console.log(winnerPosition[1]-winnerPosition[0]);
        if ((winnerPosition[1] - winnerPosition[0]) == 1) {
            let tmp = nameOfLineClass + ' active horizontal-'+winnerPosition[2];
            setNameOfLineClass(tmp)
          }
          else if((winnerPosition[1] - winnerPosition[0]) == 3) {
            let tmp = nameOfLineClass + ' active vertical-'+winnerPosition[2]
            setNameOfLineClass(tmp)
          }
          else {
              let tmp = nameOfLineClass + ' active diagonal-'+winnerPosition[2]
              setNameOfLineClass(tmp)
          }
        console.log(nameOfLineClass);
        


        //update info about count of winners
        setResult({winner: player.name, state:'won'})
        updateCountOfWin();
      }
    })
  }
  const updateCountOfWin = () => {
    const winnerPlayer = player;
        winnerPlayer.countOfWin++;
        const playerIndex = playerList.findIndex(obj => obj.symbol === winnerPlayer.symbol);
        const tempList = [...playerList];
        tempList[playerIndex] = winnerPlayer;
        setPlayerList(tempList)
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach( square => { 
      if (square == '') filled = false
    })
    if (filled){
      setResult({winner: 'No One', state: 'Tie'})
    }
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setNameOfLineClass('board ')
    setPlayer(playerList[0])
  }

  return (
    <div className="App">
      <div className={nameOfLineClass}>
        <div className="row">
          <Square value={board[0]} chooseSquare={() => {chooseSquare(0)}} />
          <Square value={board[1]} chooseSquare={() => {chooseSquare(1)}} />
          <Square value={board[2]} chooseSquare={() => {chooseSquare(2)}} />
        </div>

        <div className="row">
          <Square value={board[3]} chooseSquare={() => {chooseSquare(3)}} />
          <Square value={board[4]} chooseSquare={() => {chooseSquare(4)}} />
          <Square value={board[5]} chooseSquare={() => {chooseSquare(5)}} />
        </div>

        <div className="row">
          <Square value={board[6]} chooseSquare={() => {chooseSquare(6)}} />
          <Square value={board[7]} chooseSquare={() => {chooseSquare(7)}} />
          <Square value={board[8]} chooseSquare={() => {chooseSquare(8)}} />
        </div>
      </div>

      <div className="scoreBlock">
        <p>Score</p>
        <p>{playerList[0].name}: {playerList[0].countOfWin}</p>
        <p>{playerList[1].name}: {playerList[1].countOfWin}</p>
      </div>
    </div>
  );
}

export default Board;