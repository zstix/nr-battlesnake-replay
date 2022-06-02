import * as React from "react";
import {
  HeadingText,
  NrqlQuery,
  Spinner,
  InlineMessage,
  PlatformState,
  PlatformStateContext,
} from "nr1";

import timeRangeToNrql from "../utils/timeRangeToNrql";
import { AccountContext } from "./AccountContext";
import { ReplayContext } from "./ReplayContext";
import Board from "./Board";

const getGameQuery = (gameId: string, platformState: PlatformState) => `
  SELECT *
  FROM Transaction
  WHERE snakeGameId = '${gameId}'
  ORDER BY snakeTurn
  LIMIT MAX
  ${timeRangeToNrql(platformState)}
`;

interface RawTurnData extends Record<string, any> {
  snakeTurn: number;
  snakeBoardFood: string;
  snakeBoardHazards: string;
  snakeBoardWidth: number;
  snakeBoardHeight: number;
  snakeData: string;

  // TODO: find a better way of doing this
  snakeOpponent_1_Name?: string;
  snakeOpponent_1_Data?: string;
  snakeOpponent_2_Name?: string;
  snakeOpponent_2_Data?: string;
  snakeOpponent_3_Name?: string;
  snakeOpponent_3_Data?: string;
  snakeOpponent_4_Name?: string;
  snakeOpponent_4_Data?: string;
}

interface Position {
  x: number;
  y: number;
}

interface RawSnakeData {
  head: Position;
  body: Position[];
  color: string;
  name?: string;
}

// TODO: move this into utils file?
const decode = <T extends unknown>(data: string): T => JSON.parse(atob(data));

// TODO: move this into utils file?
const isPosEqual = (a: Position) => (b: Position) => a.x == b.x && a.y == b.y;

// TODO: move this into utils file?
const isPosInArray = (pos: Position, arr: Position[]) =>
  arr.some(isPosEqual(pos));

// TODO: move this into utils file?
const parseRawTurnData = (raw: RawTurnData): TurnState => {
  const board = {
    width: raw.snakeBoardWidth,
    height: raw.snakeBoardHeight,
    food: decode<Position[]>(raw.snakeBoardFood),
    hazards: decode<Position[]>(raw.snakeBoardHazards),
  };

  let snakes: RawSnakeData[] = [decode<RawSnakeData>(raw.snakeData)];

  // TODO: find a better way of doing this
  if (raw.snakeOpponent_1_Data)
    snakes.push(decode<RawSnakeData>(raw.snakeOpponent_1_Data));
  if (raw.snakeOpponent_2_Data)
    snakes.push(decode<RawSnakeData>(raw.snakeOpponent_2_Data));
  if (raw.snakeOpponent_3_Data)
    snakes.push(decode<RawSnakeData>(raw.snakeOpponent_3_Data));
  if (raw.snakeOpponent_4_Data)
    snakes.push(decode<RawSnakeData>(raw.snakeOpponent_4_Data));

  const cells = Array.from({ length: board.height }).map((_, row) =>
    Array.from({ length: board.width }).map((_, x) => {
      const pos = { x, y: board.height - row - 1 };

      const isFood = Boolean(board.food.find(isPosEqual(pos)));
      const isHazard = Boolean(board.hazards.find(isPosEqual(pos)));

      const snake = snakes.find(({ body }) => isPosInArray(pos, body));
      const color = snake ? snake.color : undefined;
      const isHead = snake && isPosEqual(pos)(snake.head);

      return { ...pos, isFood, isHazard, isHead, color };
    })
  );

  return { turn: raw.snakeTurn, cells };
};

interface PlayerProps {
  gameId: string;
}

// TODO: cache the game data?
const Player = ({ gameId }: PlayerProps) => {
  const { account } = React.useContext(AccountContext);
  const { games, setGames } = React.useContext(ReplayContext);

  // if we already have the game fetched, just render it
  if (games?.[gameId].turns?.length) {
    return (
      <div className="bsr-player">
        <HeadingText type={HeadingText.TYPE.HEADING_4}>{gameId}</HeadingText>
        <Board state={games[gameId].turns![0]} />
      </div>
    );
  }

  return (
    <PlatformStateContext.Consumer>
      {(platformState) => (
        <NrqlQuery
          accountIds={[account]}
          query={getGameQuery(gameId, platformState)}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner />;
            }

            if (error) {
              console.log("Fetch error:", error);
              return (
                <InlineMessage
                  type={InlineMessage.TYPE.WARNING}
                  label="Unable to fetch Battlesnake game"
                />
              );
            }

            // TODO: remove
            console.log("post-fetch data", data);

            // TODO: get all turns, not just the first
            const turn = parseRawTurnData(data[0].data[0]);

            setGames({
              ...games,
              [gameId]: {
                ...games[gameId],
                turns: [turn],
              },
            });

            return (
              <div className="bsr-player">
                <HeadingText type={HeadingText.TYPE.HEADING_4}>
                  {gameId}
                </HeadingText>
                <Board state={turn} />
              </div>
            );
          }}
        </NrqlQuery>
      )}
    </PlatformStateContext.Consumer>
  );
};

export default Player;
