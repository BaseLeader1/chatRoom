
import React from "react";
import Tile from "./Tile";

function Board({ tiles, onTileClick, playerTurn, strikeClass, selectedUserName }) {
  return (
    <div className="board">
      <div className="opponent-name">Opponent: {selectedUserName}</div>
      {tiles.map((value, index) => (
        <Tile
          key={index}
          value={value}
          onClick={() => onTileClick(index)}
          playerTurn={playerTurn}
          className={getClassname(index)}
        />
      ))}
    </div>
  );
}

function getClassname(index) {
  let className = "";
  if (index % 3 !== 2) className += "right-border ";
  if (index < 6) className += "bottom-border ";
  return className.trim();
}

export default Board;
