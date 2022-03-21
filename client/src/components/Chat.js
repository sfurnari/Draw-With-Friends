import React, {useState, useEffect} from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import "../styles/game.css"

const Chat = ({socket, name , currentlyDrawing}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () =>{
    if (currentMessage !== "") {
      const messageData = {
        // room,
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
  }, [socket])

  return (
    <div className="chat-container">
      <div 
        className="chat-input"
        style={{pointerEvents: currentlyDrawing ? 'none' : 'auto'}}
      >
        <input
          className="text-field"
          type="text" 
          value={currentMessage}
          placeholder="Type your guess!"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage()
          }} 
        />
        <button 
          onClick={sendMessage}
          className="chat-button"
        >
          &#9658;
        </button>
      </div>
        <ScrollToBottom>
          <div className="chat-body">        
              {
              messageList.map((messageData) => {
                return <p className="message">
                  <strong>{messageData.name}: </strong>
                  {messageData.message}
                </p>
              })}
          </div>
        </ScrollToBottom>
    </div>
  )
}

export default Chat