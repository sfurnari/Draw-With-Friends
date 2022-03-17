const express = require('express')
const app = express()
const http = require('http')
const { env } = require('process')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})
const PORT = process.env.PORT || 8080;
const router = require('./router')

io.on('connection', (socket) => {
  console.log('User has joined:', socket.id);

  socket.on('join', (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined the room: ${data}`);
  })

  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('getMessage', data)
  })

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  
  socket.on('disconnect', () => {
    console.log('User has disconnected:', socket.id);
  })

});


app.use(router)

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));