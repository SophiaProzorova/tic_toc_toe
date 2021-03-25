import {useState} from 'react'

import ModalWindow from './components/ModalWindow';
import './App.css';
import Board from './components/Board';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [players, setPlayers] = useState(['first player', 'second player']);
  
  return(
    
    <>
    {
      (isOpen) ? 
        (<ModalWindow onClose={(...players)=> {
          setIsOpen(false)
          setPlayers(players);
          console.log(players);
        }} />) : 
        (<Board players={players}/>)
      }
    </>
  ) 
}

export default App;
