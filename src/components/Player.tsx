import * as React from "react";
import {
  NrqlQuery,
  Spinner,
  InlineMessage,
  PlatformState,
  PlatformStateContext,
} from "nr1";

import ACTIONS from "../store/actions";
import timeRangeToNrql from "../utils/timeRangeToNrql";
import parseRawTurnData from "../utils/parseRawTurnData";
import { AccountContext } from "./AccountContext";
import { ReplayContext } from "./ReplayContext";
import useGameTimer from "../hooks/useGameTimer";
import Board from "./Board";
import Controls from "./Controls";

const getGameQuery = (gameId: string, platformState: PlatformState) => `
  SELECT *
  FROM Transaction
  WHERE snakeGameId = '${gameId}'
  ORDER BY snakeTurn
  LIMIT MAX
  ${timeRangeToNrql(platformState)}
`;

interface PlayerProps {
  gameId: string;
}

const Player = ({ gameId }: PlayerProps) => {
  const { account } = React.useContext(AccountContext);
  const { state, dispatch } = React.useContext(ReplayContext);

  const game = state.games[gameId];
  const { turn } = game;

  useGameTimer(gameId, game, dispatch!);

  // if we already have the game fetched, just render it
  if (state.games?.[gameId].turns?.length) {
    const turns = state.games[gameId].turns;

    return (
      <div className="bsr-player">
        <div>{gameId}</div>
        <Board state={turns![turn]} />
        <Controls turn={turn} maxTurn={turns!.length} id={gameId} />
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

            const turns = data[0].data.map(parseRawTurnData) as TurnState[];

            // fetch the game and store in state
            dispatch!({
              type: ACTIONS.SET_TURNS,
              payload: { id: gameId, turns },
            });

            // don't return anything...this will re-render when we get data back
            return null;
          }}
        </NrqlQuery>
      )}
    </PlatformStateContext.Consumer>
  );
};

export default Player;
