import * as React from "react";

import Cell from "./Cell";

interface BoardProps {
  state: TurnState;
}

const Board = ({ state }: BoardProps) => (
  <div
    className="bsr-board"
    style={{ gridTemplateColumns: `repeat(${state.cells[0].length}, 1fr)` }}
  >
    {state.cells.map((row) =>
      row.map((cell) => <Cell key={`${cell.x},${cell.y}`} {...cell} />)
    )}
  </div>
);

export default Board;
