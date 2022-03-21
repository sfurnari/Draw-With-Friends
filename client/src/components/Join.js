import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/game.css"

const Join = (props) => {
  // console.log(props.socket.id);
  const [name, setName] = useState('')
  // const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (name !== '') {
      props.socket.emit("join", name)
    }
  }
  

  return (
    <div>
      <h1 className="header">Draw With Friends</h1>
      <div className="join-container">
        <h1 className="join-game">Join Game</h1>
        <div>
          <input 
            placeholder="Enter your name here" 
            className="joinInput" 
            type="text" 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <input 
            placeholder="Room" 
            className="joinInput" 
            type="text" 
            onChange={(e) => setRoom(e.target.value)} 
          />
        </div> */}
        <Link  
          style={{pointerEvents: (name !== '') ? 'auto' : 'none'}}
          to={'/game'}
          state={{name}}         
          onClick={joinRoom}
          onKeyPress={(e) => {
            e.key === "Enter" && joinRoom()        
          }}  
        >
          <button 
            className="button" 
            type="submit"
          > 
            Click here to Join
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Join