import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom'
import Chat from "./Chat";
import Board from "./Whiteboard";

const Game = (props) => {

  const location = useLocation()
  const {name} = location.state

  return (
    <div>
      hello
      <Board socket={props.socket}/>
      <Chat 
        socket={props.socket} 
        name={name} 
      />
    </div>
  )
}

export default Game