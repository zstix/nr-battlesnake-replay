import * as React from "react";
import { HeadingText } from "nr1";
// import { NrqlQuery, Spinner, InlineMessage } from "nr1";

// import { ReplayContext } from "./ReplayContext";

// TODO: pull this from the nerdlet state
// const TIME_SINCE = "1 week ago";

// const getGameQuery = (gameId: string) => `
// SELECT *
// FROM Transaction
// WHERE snakeGameId = '${gameId}'
// ORDER BY snakeTurn
// SINCE ${TIME_SINCE}
// LIMIT MAX
// `;

interface RawTurnData extends Record<string, string | number | boolean> {
  snakeTurn: number;
  snakeBoardFood: string;
  snakeBoardHazards: string;
  snakeBoardWidth: number;
  snakeBoardHeight: number;
}

interface Position {
  x: number;
  y: number;
}

interface TurnData {
  turn: number;
  board: {
    width: number;
    height: number;
    food: Position[];
    hazards: Position[];
  };
}

const parseRawTurnData = (data: RawTurnData): TurnData => ({
  turn: data.snakeTurn,
  board: {
    width: data.snakeBoardWidth,
    height: data.snakeBoardHeight,
    food: JSON.parse(atob(data.snakeBoardFood)) as Position[],
    hazards: JSON.parse(atob(data.snakeBoardHazards)) as Position[],
  },
});

const testTurnData: RawTurnData = {
  appId: 1076323376,
  appName: "BattleSnakeOil",
  content_type: "application/json",
  "cowboy.req_body_duration_ms": 0.573,
  "cowboy.req_body_length": 1439,
  "cowboy.resp_body_length": 16,
  "cowboy.resp_duration_ms": 0,
  duration: 0.002146,
  duration_ms: 2.146,
  duration_s: 0.002146,
  duration_us: 2146,
  end_time: 1653516170216.146,
  entityGuid: "MzQwMjkwOHxBUE18QVBQTElDQVRJT058MTA3NjMyMzM3Ng",
  guid: "7b687f7359a4981b",
  host: "snake-server",
  memory_kb: 21.1796875,
  name: "WebTransaction/Plug/POST//move",
  path: "/move",
  pid: "#PID<0.1474.0>",
  plug_name: "/Plug/POST//move",
  priority: 0.214023,
  process_spawns: 0,
  realAgentId: 1076325080,
  reductions: 164273,
  remote_ip: "52.35.169.124",
  request_method: "POST",
  request_url: "45.33.45.245/move",
  sampled: false,
  snakeBoardFood:
    "W3sieCI6NywieSI6MTB9LHsieCI6MTAsInkiOjd9LHsieCI6OSwieSI6OX0seyJ4IjoxMCwieSI6Nn0seyJ4IjoyLCJ5IjowfSx7IngiOjYsInkiOjl9LHsieCI6OCwieSI6N31d",
  snakeBoardHazards: "W10=",
  snakeBoardHeight: 11,
  snakeBoardWidth: 11,
  snakeData:
    "eyJib2R5IjpbeyJ4IjozLCJ5IjozfSx7IngiOjIsInkiOjN9LHsieCI6MiwieSI6NH0seyJ4IjozLCJ5Ijo0fSx7IngiOjQsInkiOjR9XSwiY29sb3IiOiIjMWNlNzgzIiwiaGVhZCI6eyJ4IjozLCJ5IjozfX0=",
  snakeGameId: "31725d83-4bdb-462e-a4f8-901b35c11f44",
  snakeHealth: 94,
  snakeId: "gs_RBQWWGwbw7jS4Tdq6JJMFxSW",
  snakeLength: 5,
  snakeName: "BattleSnakeOil",
  snakeOpponent_1_Data:
    "eyJib2R5IjpbeyJ4IjowLCJ5IjoyfSx7IngiOjEsInkiOjJ9LHsieCI6MSwieSI6M30seyJ4IjowLCJ5IjozfV0sImNvbG9yIjoiIzg4ODg4OCIsImhlYWQiOnsieCI6MCwieSI6Mn19",
  snakeOpponent_1_Health: 60,
  snakeOpponent_1_Id: "gs_733XP4gCtXRVJGyjXpYPTHJ9",
  snakeOpponent_1_Length: 4,
  snakeOpponent_1_Name: "BasicSnake",
  snakeRules: "standard",
  snakeTurn: 42,
  start_time: 1653516170214,
  status: 200,
  "tags.account": "Account 3402908",
  "tags.accountId": "3402908",
  "tags.snake": "battlesnakeoil",
  "tags.trustedAccountId": "3402908",
  timestamp: 1653516170214,
  totalTime: 0.002,
  total_time_s: 0.002,
  traceId: "713f329df663496c99b514e3c696a3d5",
  transactionSubType: "Plug",
  transactionType: "Web",
  user_agent: "BattlesnakeEngine/1.0.83",
};

interface PlayerProps {
  gameId: string;
}

const Player = ({ gameId }: PlayerProps) => {
  const turn = parseRawTurnData(testTurnData);
  const { width, height } = turn.board;

  // TODO: render snakes and food and hazards
  return (
    <div className="bsr-player">
      <HeadingText type={HeadingText.TYPE.HEADING_4}>{gameId}</HeadingText>
      <div
        className="bsr-board"
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
      >
        {Array.from({ length: height }).map((_, row) =>
          Array.from({ length: width }).map((_, col) => (
            <div className="bsr-board--cell">
              {col},{height - row - 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/*
// TODO: cache the game data?
const Player = ({ gameId }: PlayerProps) => {
  const { account } = React.useContext(ReplayContext);

  return (
    <NrqlQuery accountIds={[account]} query={getGameQuery(gameId)}>
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

        // TODO: render!
        console.log("game data", data);

        return <div>{gameId}</div>;
      }}
    </NrqlQuery>
  );
};
*/

export default Player;
