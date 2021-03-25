import React, {useState} from 'react'
// import Board from './Board' 
import './Modal.css'

export default function ModalWindow({onClose}) {
    const [player1, setPlayer1] = useState(['First player'])
    const [player2, setPlayer2] = useState(['Second player'])


    return (
        <div className="modal">
            <label for="firstPlayer">First Player</label>
            <input id="firstPlayer" onChange = { (e) => setPlayer1(e.target.value)} />
            <label for="secondPlayer">Second Player</label>
            <input id="secondPlayer" onChange = { (e) => setPlayer2(e.target.value)} />
            <button onClick={()=>onClose(player1, player2)}> Close Modal </button>
        </div>
    )
}
