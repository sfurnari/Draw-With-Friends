import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './components/Join'
import Game from './components/Game'
// import Board from "./components/Whiteboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join />}/>
      <Route path="/game" element={<Game />}/>
    </Routes>
  </Router>
);

export default App;
