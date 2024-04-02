// TicTacToe.js
import React, { useState, useEffect } from "react";
import Board from "./board";
import GameOver from "./gameOver";
import GameState from "./gameState";
import Reset from "./reset";
import Strike from "./strike";
import io from "socket.io-client";
import axios from "axios";

import "./TicTacToe.css"; // Import the CSS file for styling

const socket = io("http://localhost:5001");
const opponent = localStorage.getItem("opponent");
const you = localStorage.getItem("yourname");

const PLAYER_X = you;
const PLAYER_O = opponent;
const handleTailClicked = async (message) => {
  try {
    // Send message to the backend API
    await axios.post("http://localhost:5001/api/auth/send", {
      sender: you,
      receiver: opponent,
      content: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

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
    const [tileValue1, tileValue2, tileValue3] = combo.map(
      (index) => tiles[index]
    );

    if (tileValue1 && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
      setStrikeClass(strikeClass);
      setGameState(
        tileValue1 === PLAYER_X ? GameState.playerXWins : GameState.playerOWins
      );
      return;
    }
  }

  if (tiles.every((tile) => tile)) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.inProgress);

  //חדש
  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        if (you && you && opponent) {
          const response = await axios.get(
            "http://localhost:5001/api/auth/ticTacToeBoard",
            {
              params: {
                sender: you,
                receiver: opponent,
              },
            }
          );

          setTiles(response.data.Board);
          socket.on("newMessage", (newMessage) => {
            setTiles((prevMessages) => [...prevMessages, newMessage]);
          });

          return () => {
            socket.disconnect();
          };
        }
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };

    fetchMessagesAndUpdateState();
  }, [playerTurn]);

  const handleTileClick = async (index) => {
    if (
      playerTurn !== you || // Check if it's not the player's turn
      gameState !== GameState.inProgress ||
      tiles[index] !== null
    ) {
      return;
    }
  
    try {
      const newTiles = [...tiles];
      newTiles[index] = playerTurn;
      setTiles(newTiles);
      setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
      // Send message to the backend API
      await axios.post("http://localhost:5001/api/auth/tailClick", {
        sender: userName.username,
        receiver: selectedUser.username,
        board: tiles,
        turn: playerTurn,
      });
    } catch (error) {
      console.error("Error sending board update:", error);
    }
  };
  

  //ישן

  const handleTileClick = (index) => {
    if (
      playerTurn !== you ||
      gameState !== GameState.inProgress ||
      tiles[index] !== null
    ) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);

    socket.emit("tileClicked", index);
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass("");
  };

  useEffect(() => {
    socket.on("tilesUpdated", (updatedTiles) => {
      setTiles(updatedTiles);
      setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
    });

    return () => {
      socket.disconnect();
    };
  }, [playerTurn]);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <h2 className="player">Your Turn: {playerTurn}</h2>
      <h2 className="opponent">Playing against: {opponent || "No Opponent"}</h2>
      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        playerTurn={playerTurn}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
      {strikeClass && <Strike strikeClass={strikeClass} />}
      <a href="/room" className="animated-link">
        <span className="link-text">Back to Room</span>
        <span className="exit-icon">&#x2716;</span>
      </a>
    </div>
  );
}

export default TicTacToe;
