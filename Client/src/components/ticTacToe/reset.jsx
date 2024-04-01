
import React from "react";
import GameState from "./gameState";

function Reset({ gameState, onReset }) {
  if (gameState === GameState.inProgress) {
    return null;
  }
  return (
    <button onClick={onReset} className="reset-button">
      Play Again
    </button>
  );
}

export default Reset;
