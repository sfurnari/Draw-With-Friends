import React, {useState} from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  

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
        onClick={e => (!name || !room) ? e.preventDefault : null} 
        to={`/game?name=${name}&room=${room}`}>
          <button className="button" type="submit"> Join Room</button>
      </Link>
    </div>
  )
}

export default Join