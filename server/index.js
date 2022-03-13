const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

io.on('connection', onConnection);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  console.log('currently drawing');
}
const port = 8080;

server.listen(port, () => console.log(`server is running on port ${port}`));