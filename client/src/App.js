import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './components/Join'
import Game from './components/Game'
import io from "socket.io-client";
// import Board from "./components/Whiteboard";

const socket = io.connect('https://draw-with-friends-backend.herokuapp.com/')


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join socket={socket}/>}/>
      <Route path="/game" element={<Game socket={socket}/>}/>
    </Routes>
  </Router>
);

export default App;
