import React from "react";

function Tile({ value, onClick, playerTurn, isWinningTile }) {
  let hoverClass = null;
  if (value == null && playerTurn != null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }

  return (
    <div onClick={onClick} className={`tile ${hoverClass} ${isWinningTile ? 'winning-tile' : ''}`}>
      {value}
    </div>
  );
}

export default Tile;
