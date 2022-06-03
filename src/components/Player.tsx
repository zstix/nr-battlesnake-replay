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
import parseRawTurnData from "../utils/parseRawTurnData";
import { AccountContext } from "./AccountContext";
import { ReplayContext } from "./ReplayContext";
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
  const { games, setGames } = React.useContext(ReplayContext);

  // if we already have the game fetched, just render it
  if (games?.[gameId].turns?.length) {
    const turns = games[gameId].turns;
    return (
      <div className="bsr-player">
        <HeadingText type={HeadingText.TYPE.HEADING_4}>{gameId}</HeadingText>
        <Board state={turns![0]} />
        <Controls turn={0} maxTurn={turns!.length} />
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

            setGames({
              ...games,
              [gameId]: {
                ...games[gameId],
                turns,
              },
            });

            // TODO: DRY this up a bit
            return (
              <div className="bsr-player">
                <HeadingText type={HeadingText.TYPE.HEADING_4}>
                  {gameId}
                </HeadingText>
                <Board state={turns[0]} />
                <Controls turn={0} maxTurn={turns.length} />
              </div>
            );
          }}
        </NrqlQuery>
      )}
    </PlatformStateContext.Consumer>
  );
};

export default Player;
