import React, {useState, useEffect} from "react";
import io from 'socket.io-client'

const Chat = ({socket, name, room}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([])
  const [wordToGuess, setWordToGuess] = useState("")

  const sendMessage = async () =>{
    if (currentMessage !== "") {
      const messageData = {
        room,
        name,
        message: currentMessage,
      }

      await socket.emit('sendMessage', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage("")
    }
  } // sednMessage()

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setMessageList((list) => [...list, data])
    })

    socket.on('wordToGuess', word => {
      setWordToGuess(word)
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
          value={currentMessage}
          placeholder="Type your guess!"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage()
          }} 
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      <div>
        <h1>{wordToGuess}</h1>
      </div>
    </div>
  )
}

export default Chat