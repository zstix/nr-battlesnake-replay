interface GameQueryResponseData {
  timestamp: number;
  snakeGameId: string;
  snakeGameIsWin: boolean;
  snakeGameWinnerId: string | null;
}

interface TurnStateCell {
  x: number;
  y: number;
  isFood?: boolean;
  isHazard?: boolean;
  isHead?: boolean;
  color?: string;
}

interface Position {
  x: number;
  y: number;
}

interface TurnState {
  turn: number;
  cells: TurnStateCell[][];
}

interface ReplayGame {
  showing: boolean;
  turn: number;
  playing: boolean;
  turns?: TurnState[];
}

type ReplayGames = Record<string, ReplayGame>;
