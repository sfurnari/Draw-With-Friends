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

const getRandomWord = () => {
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  return word
}

const getRandomDrawer = () => {
  const drawer = currentUsers[Math.floor(Math.random() * currentUsers.length)];
  return drawer
}

const startNewRound = () => {
  const newWord = getRandomWord()
  wordToGuess = newWord
  io.emit('getWord', wordToGuess)
  io.emit('newRound')
}



io.on('connection', (socket) => {
  console.log('User has joined:', socket.id);

  socket.on('join', (name) => {
    console.log(`User ${name} with ID: ${socket.id} joined the game`);

    // add socketID to currentUser array
    currentUsers.push({socketId: socket.id, name})
    console.log(currentUsers);
    io.emit('userList', currentUsers)

    // after 1st player joins set to drawer and get random word
    if (currentUsers.length === 1) {
      wordToGuess = getRandomWord()
      drawing = socket.id

      io.to(drawing).emit('currentDrawer', true)
    }
    
    io.emit('getWord', wordToGuess)

    socket.on('sendMessage', (messageData) => {

      // if correct word is guessed start new round 
      if (messageData.message === wordToGuess) {
        io.emit('currentDrawer', false)

        // set correct guesser to new drawer
        io.to(socket.id).emit('currentDrawer', true)
        startNewRound()
      } else {
        socket.broadcast.emit('getMessage', messageData)
      }
    }) // on sendMessage
  
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  }) // on Join

   
  socket.on('disconnect', () => {
    console.log('User has disconnected:', socket.id);
    currentUsers = currentUsers.filter(user => user.socketId !== socket.id)
    io.emit('userList', currentUsers)

    console.log(currentUsers);
  })

});


app.use(router)

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));