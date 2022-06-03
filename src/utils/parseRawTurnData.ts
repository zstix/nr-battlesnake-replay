import { decode, isPosEqual, isPosInArray } from "./";

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

interface RawSnakeData {
  head: Position;
  body: Position[];
  color: string;
  name?: string;
}

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

export default parseRawTurnData;
