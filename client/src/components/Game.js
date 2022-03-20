import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom'
import Chat from "./Chat";
import Board from "./Whiteboard";

const Game = (props) => {

  const location = useLocation()
  const {name} = location.state

  const [wordToGuess, setWordToGuess] = useState('')
  const [currentlyDrawing, setCurrentlyDrawing] = useState(false)
  const [userList, setUserList] = useState([])

  const hideWord = (word) => {
    return word.replace(/[a-z]/g, '_ ')
  }

  useEffect(() => {
    props.socket.on('getWord', (word) => {
      setWordToGuess(word)
    })

    props.socket.on('currentDrawer', (data) => {
      setCurrentlyDrawing(data)
    })
  }, [wordToGuess])

  useEffect(() => {
    props.socket.on('userList', (users) => {
      setUserList(users)
    })
  }, [userList]);

  return (
    <div>
      {
        currentlyDrawing
        ?
        <div>
          <h3>You are currently drawing</h3>
          <h1>{wordToGuess}</h1>  
        </div>
        :
        <div>
          <h3>You are guessing</h3>
          <h1>{hideWord(wordToGuess)}</h1>
        </div>
      }
      <div className="users-container">
        {userList.map((user) => {
          return <p><strong>{user.name}</strong></p>
        })}
      </div>
      <Board 
        socket={props.socket}
        currentlyDrawing={currentlyDrawing}
      />
      <Chat 
        socket={props.socket} 
        name={name}
        currentlyDrawing={currentlyDrawing} 
      />
    </div>
  )
}

export default Game