import express from "express";
import { TicTacToeGame } from "../models/ticTacToeGame.js";




// Function to check for a winner or draw
// Function to check for a winner or draw
function checkWinner(board) {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const combo of winningCombinations) {
      const [tileValue1, tileValue2, tileValue3] = combo.map(index => board[index]);
  
      if (tileValue1 && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        return tileValue1;
      }
    }
  
    if (board.every(tile => tile)) {
      return "draw";
    }
  
    return null;
  }
  
  // Function to start a new game
  export const startNewGame = async (req, res) => {
    try {
      const { playerX, playerO } = req.body;
  
      // Create a new game
      const newGame = await TicTacToeGame.create({
        playerX,
        playerO,
        currentPlayerTurn: playerX, // Player X starts the game
      });
  
      res.status(201).json(newGame);
    } catch (error) {
      console.error("Error starting a new game:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Function to make a move
  export const makeMove = async (req, res) => {
    try {
      const { gameId } = req.params;
      const { player, position } = req.body;
  
      // Find the game by ID
      const game = await TicTacToeGame.findById(gameId);
  
      // Check if the game exists
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
  
      // Check if it's the player's turn
      if (game.currentPlayerTurn !== player) {
        return res.status(400).json({ message: "It's not your turn" });
      }
  
      // Check if the position is valid
      if (game.board[position] !== null) {
        return res.status(400).json({ message: "Position already occupied" });
      }
  
      // Make the move
      game.board[position] = player;
      game.currentPlayerTurn = player === game.playerX ? game.playerO : game.playerX;
  
      // Check for a winner or draw
      const winner = checkWinner(game.board);
      if (winner) {
        game.status = winner === "draw" ? "draw" : winner === game.playerX ? "playerXWins" : "playerOWins";
      }
  
      // Save the updated game
      await game.save();
  
      res.json(game);
    } catch (error) {
      console.error("Error making a move:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
