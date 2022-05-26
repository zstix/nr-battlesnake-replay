import * as React from "react";
import { NrqlQuery, Spinner, InlineMessage } from "nr1";

import { ReplayContext } from "./ReplayContext";

// TODO: pull this from the nerdlet state
const TIME_SINCE = "1 week ago";

const getGameQuery = (gameId: string) => `
SELECT *
FROM Transaction
WHERE snakeGameId = '${gameId}'
ORDER BY snakeTurn
SINCE ${TIME_SINCE}
LIMIT MAX
`;

interface PlayerProps {
  gameId: string;
}

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
              label="Unable to fetch recent Battlesnake games"
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

export default Player;
