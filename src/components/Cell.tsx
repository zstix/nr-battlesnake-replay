import * as React from "react";

const Cell = (cell: TurnStateCell) => (
  <div className="bsr-board--cell" key={`${cell.x},${cell.y}`}>
    {cell.isFood && <div className="bsr-board--food" />}
    {cell.isHazard && <div className="bsr-board--hazard" />}
    {cell.color && (
      <div
        className={`bsr-board--snake ${cell.isHead ? "head" : ""}`}
        style={{ backgroundColor: cell.color }}
      />
    )}
  </div>
);

export default Cell;
