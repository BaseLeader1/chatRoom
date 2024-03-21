import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Room from "./components/pages/room";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
