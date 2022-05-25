import * as React from "react";
import {
  InlineMessage,
  Spinner,
  Stack,
  StackItem,
  AccountPicker,
  NrqlQuery,
} from "nr1";

import GameTable from "./GameTable";

// TODO: pull this from the nerdlet state
const TIME_SINCE = "1 day ago";

const GAME_QUERY = `
SELECT snakeGameId, snakeGameIsWin, snakeGameWinnerId
FROM Transaction
WHERE path = '/end'
SINCE ${TIME_SINCE}
`;

const GamePicker = () => {
  const [account, setAccount] = React.useState<number>();

  return (
    <Stack
      directionType={Stack.DIRECTION_TYPE.VERTICAL}
      spacingType={[Stack.SPACING_TYPE.LARGE]}
    >
      <StackItem>
        <AccountPicker
          value={account}
          onChange={(_e, value) => setAccount(value)}
        />
      </StackItem>

      {account && (
        <StackItem>
          <NrqlQuery accountIds={[account]} query={GAME_QUERY}>
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

              const games = data[0].data as GameQueryResponseData[];

              return <GameTable games={games} />;
            }}
          </NrqlQuery>
        </StackItem>
      )}
    </Stack>
  );
};

export default GamePicker;
