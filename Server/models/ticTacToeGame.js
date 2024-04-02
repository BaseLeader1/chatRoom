import mongoose from "mongoose";

const ticTacToeGameSchema = new mongoose.Schema({
  board: {
    type: [String],
    required: true,
    default: Array(9).fill(null),
  },
  playerX: { type: String, required: true },
  playerO: { type: String, required: true },
  currentPlayerTurn: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['inProgress', 'playerXWins', 'playerOWins', 'draw'],
    default: 'inProgress',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TicTacToeGame", ticTacToeGameSchema);
