import * as React from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell,
} from "nr1";

interface GameTableProps {
  games: GameQueryResponseData[];
}

const getWinState = (game: GameQueryResponseData) => {
  if (!game.snakeGameId) return "tie";

  return game.snakeGameIsWin ? "win" : "loss";
};

// FIXME: get this working? We have data I dunno
const GameTable = ({ games }: GameTableProps) => (
  <Table items={games}>
    <TableHeader>
      <TableHeaderCell>Game</TableHeaderCell>
      <TableHeaderCell>Result</TableHeaderCell>
      <TableHeaderCell>Time</TableHeaderCell>
    </TableHeader>

    {({ item }) => (
      <TableRow>
        <TableRowCell>{item.snakeGameId}</TableRowCell>
        <TableRowCell>{getWinState(item)}</TableRowCell>
        <TableRowCell>{item.timestamp}</TableRowCell>
      </TableRow>
    )}
  </Table>
);

export default GameTable;
