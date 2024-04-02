import React, { useState, useEffect } from "react";
import Board from "./board";
import GameOver from "./gameOver";
import GameState from "./gameState";
import Reset from "./reset";
import Strike from "./strike";
import io from "socket.io-client";
import useUserStore from "../zustand/userStore.js";

const socket = io("http://localhost:5001"); // Connect to the Tic Tac Toe game server

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
  // Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  // Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  // Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const { selectedUser } = useUserStore();
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress || tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);

    // Emit the clicked tile index to the Tic Tac Toe game server
    socket.emit("tileClicked", index);
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    // Listen for updates from the Tic Tac Toe game server
    socket.on("tilesUpdated", (updatedTiles) => {
      setTiles(updatedTiles);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <h2>
        Playing against: {selectedUser ? selectedUser.username : "No Opponent"}
      </h2>
      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        playerTurn={playerTurn}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default TicTacToe;
