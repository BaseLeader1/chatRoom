
import React from "react";
import GameState from "./gameState.js";

function GameOver({ gameState }) {
  let message = "";
  switch (gameState) {
    case GameState.playerOWins:
      message = "O Wins";
      break;
    case GameState.playerXWins:
      message = "X Wins";
      break;
    case GameState.draw:
      message = "Draw";
      break;
    default:
      return null;
  }
  return <div className="game-over">{message}</div>;
}

export default GameOver;
