import React from "react";
import Tile from "./tile";

function Board({ tiles, onTileClick, playerTurn, strikeClass, selectedUserName, winningTiles }) {
  return (
    <div className="board">
       {/* <div className="opponent-name">Opponent: {selectedUserName}</div> */}
      {tiles.map((value, index) => (
        <Tile
          key={index}
          value={value}
          onClick={() => onTileClick(index)}
          playerTurn={playerTurn}
          isWinningTile={winningTiles.includes(index)} // Check if the tile is part of winning tiles
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
