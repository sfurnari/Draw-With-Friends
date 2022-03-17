import React, {useState, useEffect} from "react";
import io from 'socket.io-client'

const Chat = ({socket, name, room}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () =>{
    if (currentMessage !== "") {
      const messageData = {
        room,
        name,
        message: currentMessage,
      }

      await socket.emit('sendMessage', messageData)
      setMessageList((list) => [...list, messageData])
    }
  } // sednMessage()

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className="chat-container">
      <div className="chat-header">
        
      </div>
      <div className="chat-body">
        {messageList.map((messageData) => {
          return <p className="message">
            <strong>{messageData.name}: </strong>
            {messageData.message}
          </p>
        })}
      </div>
      <div className="chat-input">
        <input
          type="text" 
          placeholder="Type your guess!"
          onChange={(e) => setCurrentMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat