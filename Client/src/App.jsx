import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Room from "./components/pages/room";
import "./App.css";
import TicTacToe from "./components/ticTacToe/ticTacToe";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Login />} />
        <Route path="/play-tictactoe" element={<TicTacToe />} /> 
      </Routes>
    </Router>
  );
}

export default App;
