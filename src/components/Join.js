import React, {useState} from "react";
import { Link } from "react-router-dom";
import socket from "../App";


const Join = (props) => {
  // console.log(props.socket.id);
  const [name, setName] = useState('')
  // const [room, setRoom] = useState('')

  // const joinRoom = () => {
  //   if (name !== '' && room !== '') {
  //     props.socket.emit("join", room)
  //   }
  // }
  

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
      {/* <div>
        <input 
          placeholder="Room" 
          className="joinInput" 
          type="text" 
          onChange={(e) => setRoom(e.target.value)} 
        />
      </div> */}
      <Link 
        // onClick={joinRoom} 
        to={'/game'}
        state={{name}}         
      >
        <button 
          className="button" 
          type="submit"
        > 
          Join Game
        </button>
      </Link>
    </div>
  )
}

export default Join