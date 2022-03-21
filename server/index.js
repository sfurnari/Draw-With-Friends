const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { env } = require('process')
const server = http.createServer(app)
const socket = require('socket.io');
const io = socket(server, {cors: {origin: "*"}});
const PORT = process.env.PORT || 8080;
const router = require('./router')

app.use(router)
app.use(cors())

const wordList = [
  'alligator', 
  'america', 
  'angle', 
  'ant', 
  'applause', 
  'apple', 
  'arch', 
  'arm', 
  'army', 
  'artist', 
  'avocado', 
  'baby', 
  'backbone', 
  'bag', 
  'baker', 
  'ball', 
  'band', 
  'baseball', 
  'basin', 
  'basket', 
  'bath', 
  'bathroom', 
  'battery', 
  'bed', 
  'bedbug', 
  'bee', 
  'beehive', 
  'bell', 
  'berry', 
  'bicycle', 
  'bird',  
  'birthday', 
  'blade', 
  'bleach', 
  'board', 
  'boat', 
  'bomb', 
  'bone', 
  'bonnet', 
  'book', 
  'boot', 
  'bottle', 
  'bow', 
  'box', 
  'boy', 
  'brain', 
  'brake', 
  'branch', 
  'brick', 
  'bridge', 
  'bruise', 
  'brush', 
  'bucket', 
  'bulb', 
  'button', 
  'cabin', 
  'cake', 
  'camera', 
  'card', 
  'cardboard', 
  'carriage', 
  'cart', 
  'cat', 
  'ceiling', 
  'chain', 
  'chalk', 
  'chameleon', 
  'charger', 
  'cheerleader', 
  'cheese', 
  'chef', 
  'chess', 
  'chime', 
  'chin', 
  'church', 
  'circle', 
  'circus', 
  'cliff', 
  'cloak', 
  'clock', 
  'cloud', 
  'coach', 
  'coal', 
  'coat', 
  'collar', 
  'comb', 
  'comedian', 
  'computer', 
  'convertible', 
  'cord', 
  'cow', 
  'cowboy', 
  'cruise', 
  'crust', 
  'cup', 
  'cupcake', 
  'curtain', 
  'cushion', 
  'darts', 
  'deep', 
  'dent', 
  'dentist', 
  'diving', 
  'dog', 
  'doghouse', 
  'door', 
  'doormat', 
  'drain', 
  'drawer', 
  'dream', 
  'dress', 
  'drip', 
  'drop', 
  'dust', 
  'ear', 
  'egg', 
  'electricity', 
  'engine',  
  'eye', 
  'face', 
  'farm', 
  'feather', 
  'finger', 
  'firefighter', 
  'fireman', 
  'fish', 
  'fizz', 
  'flag', 
  'flagpole', 
  'floor', 
  'flute', 
  'fly', 
  'fog', 
  'foot', 
  'fork', 
  'fowl', 
  'frame',  
  'frog', 
  'garbage', 
  'garden', 
  'garfield', 
  'gate', 
  'giant', 
  'girl', 
  'glove', 
  'goat', 
  'goblin',  
  'gun',  
  'hair', 
  'hammer', 
  'hand', 
  'handle', 
  'hat', 
  'head', 
  'headphones', 
  'heart', 
  'hockey', 
  'hook', 
  'hopscotch', 
  'horn', 
  'horse', 
  'hospital', 
  'house', 
  'houseboat', 
  'hurdle', 
  'internet', 
  'island', 
  'jewel', 
  'joke', 
  'kettle', 
  'key', 
  'knee', 
  'kneel', 
  'knife', 
  'knight', 
  'knot', 
  'koala', 
  'lace', 
  'lap', 
  'lawnmower', 
  'leaf', 
  'leak', 
  'leg', 
  'lighthouse', 
  'line', 
  'lip', 
  'lock', 
  'mailman', 
  'map', 
  'mascot', 
  'match', 
  'mattress', 
  'money', 
  'monkey', 
  'moon', 
  'mouth', 
  'muscle', 
  'mushroom', 
  'music', 
  'nail', 
  'nature', 
  'neck', 
  'needle', 
  'neet', 
  'nerve', 
  'net', 
  'newspaper', 
  'nightmare', 
  'nose', 
  'nut', 
  'oar', 
  'office', 
  'orange', 
  'outside', 
  'oven', 
  'owl', 
  'pajamas', 
  'parcel', 
  'park', 
  'password', 
  'peach', 
  'pen', 
  'pencil', 
  'pharmacist', 
  'photograph', 
  'picnic', 
  'picture', 
  'pig', 
  'pilot', 
  'pin', 
  'pineapple', 
  'pinwheel', 
  'pipe', 
  'pirate', 
  'plane', 
  'plank', 
  'plate', 
  'plough', 
  'pocket', 
  'pool', 
  'popsicle',  
  'pot', 
  'potato', 
  'prison', 
  'pump', 
  'puppet', 
  'purse', 
  'queen', 
  'quilt', 
  'raft', 
  'rail', 
  'raincoat', 
  'rat', 
  'ray', 
  'receipt', 
  'ring', 
  'rod', 
  'roof', 
  'root', 
  'rug', 
  'safe', 
  'sail', 
  'salmon', 
  'salt', 
  'sandbox', 
  'scale', 
  'school', 
  'scissors', 
  'screw', 
  'season', 
  'seed', 
  'shallow', 
  'shampoo', 
  'sheep', 
  'sheets', 
  'shelf', 
  'ship', 
  'shirt', 
  'shoe', 
  'shrink', 
  'skate', 
  'ski', 
  'skin', 
  'skirt', 
  'sleep', 
  'snake', 
  'sneeze', 
  'snowball', 
  'sock', 
  'song', 
  'spade', 
  'speakers', 
  'sponge', 
  'spoon', 
  'spring', 
  'sprinkler', 
  'square', 
  'stamp', 
  'star', 
  'state', 
  'station', 
  'stem', 
  'stick', 
  'stingray', 
  'stocking', 
  'stomach', 
  'store', 
  'street', 
  'suitcase', 
  'sun', 
  'sunburn', 
  'sushi', 
  'swamp', 
  'sweater', 
  'table', 
  'tail', 
  'teapot', 
  'thief', 
  'think', 
  'thread', 
  'throat', 
  'thumb', 
  'ticket',  
  'tiptoe', 
  'toe', 
  'tongue', 
  'tooth', 
  'town', 
  'train', 
  'tray', 
  'treasure', 
  'tree', 
  'trip', 
  'trousers', 
  'turtle', 
  'tusk', 
  'tv', 
  'umbrella', 
  'violin', 
  'wall', 
  'watch', 
  'wax', 
  'wheel', 
  'whip', 
  'whistle', 
  'wig', 
  'window', 
  'wing', 
  'wire', 
  'worm', 
  'yardstick', 
  'zoo'
];

let currentUsers = []
let wordToGuess;
let drawing;
let winner;

const getRandomWord = () => {
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  return word
}

const getRandomDrawer = () => {
  const drawer = currentUsers[Math.floor(Math.random() * currentUsers.length)];
  return drawer
}

const startNewRound = (id) => {
  const newWord = getRandomWord()
  wordToGuess = newWord
  io.to(id).emit('currentDrawer', true)
  io.emit('getWord', wordToGuess)
  io.emit('newRound')
}


// on initial connection
io.on('connection', (socket) => {
  console.log('User has joined:', socket.id);

  // on join game
  socket.on('join', (name) => {
    console.log(`User ${name} with ID: ${socket.id} joined the game`);

    // add socketID to currentUser array and send to FE
    currentUsers.push({socketId: socket.id, name, points: 0})
    console.log(currentUsers);
    io.emit('userList', currentUsers)

    // after 1st player joins set to drawer and get random word
    if (currentUsers.length === 1) {
      wordToGuess = getRandomWord()
      drawing = socket.id

      io.to(drawing).emit('currentDrawer', true)
    }
    io.emit('getWord', wordToGuess)

    // on message sent
    socket.on('sendMessage', (messageData) => {

      // if correct word is guessed start new round 
      if (messageData.message === wordToGuess) {

        const index = currentUsers.findIndex(el => {
          return el.socketId === socket.id;
        })
        currentUsers[index].points += 10
        io.emit('userList', currentUsers)
        io.emit('currentDrawer', false)
        
        winner = {name: currentUsers[index].name, status: true}
        io.emit('roundWon', winner)


        // set winner to drawer, add points and grab new word
        setTimeout(() => {
          winner.status = false
          io.emit('roundWon', winner)
          startNewRound(socket.id)
        }, 5000)
      } else {
        socket.broadcast.emit('getMessage', messageData)
      }
    }) // on sendMessage
  
    // on drawing event
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  }) // on Join

  // on disconnect, remove socket from currentUsers array and emit new array
  socket.on('disconnect', () => {
    console.log('User has disconnected:', socket.id);
    currentUsers = currentUsers.filter(user => user.socketId !== socket.id)
    io.emit('userList', currentUsers)

    console.log(currentUsers);
  })

});



server.listen(PORT, () => console.log(`server is running on port ${PORT}`));