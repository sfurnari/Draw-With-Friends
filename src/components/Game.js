import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom'
import Chat from "./Chat";
import Board from "./Whiteboard";

const Game = (props) => {

  const location = useLocation()
  const {name} = location.state

  const [wordToGuess, setWordToGuess] = useState('')
  const [currentlyDrawing, setCurrentlyDrawing] = useState(false)

  useEffect(() => {
    props.socket.on('getWord', (word) => {
      setWordToGuess(word)
    })

    props.socket.on('currentDrawer', data => {
      setCurrentlyDrawing(data)
    })
  }, [wordToGuess])

  return (
    <div>
      <h1>{wordToGuess}</h1>
      {
        currentlyDrawing
        ?
        <h3>You are currently drawing</h3>
        :
        <h3>You are guessing</h3>
      }
      <Board socket={props.socket}/>
      <Chat 
        socket={props.socket} 
        name={name} 
      />
    </div>
  )
}

export default Game