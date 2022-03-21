import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './components/Join'
import Game from './components/Game'
import io from "socket.io-client";

const ENDPOINT = 'https://draw-with-friends-backend.herokuapp.com/'
const LOCALHOST = 'http://localhost:8080'

const socket = io.connect(ENDPOINT)


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join socket={socket}/>}/>
      <Route path="/game" element={<Game socket={socket}/>}/>
    </Routes>
  </Router>
);

export default App;
