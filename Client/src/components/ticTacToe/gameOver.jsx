
import React from "react";
import GameState from "./GameState";

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
