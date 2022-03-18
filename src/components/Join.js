import React, {useState} from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect('http://localhost:8080')

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit("join", room)
    }
  }
  

  return (
    <div className="joinContainer">
      <h1 className="heading">Join</h1>
      <div>
        <input 
          placeholder="Name" 
          className="joinInput" 
          type="text" 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <input 
          placeholder="Room" 
          className="joinInput" 
          type="text" 
          onChange={(e) => setRoom(e.target.value)} 
        />
      </div>
      <Link 
        onClick={joinRoom} 
        to={'/game'}
        state={{name, room}}         
      >
        <button 
          className="button" 
          type="submit"
        > 
          Join Room
        </button>
      </Link>
    </div>
  )
}

export default Join