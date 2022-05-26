import * as React from "react";
import {
  InlineMessage,
  Spinner,
  Stack,
  StackItem,
  AccountPicker,
  NrqlQuery,
  HeadingText,
} from "nr1";

import GameList from "./GameList";

// TODO: pull this from the nerdlet state
const TIME_SINCE = "1 week ago";

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
      fullWidth
    >
      <StackItem>
        <AccountPicker
          value={account}
          onChange={(_e, value) => setAccount(value)}
        />
      </StackItem>

      {account && (
        <StackItem style={{ width: "90%" }}>
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

              const games =
                (data?.[0]?.data?.filter(
                  (d: GameQueryResponseData) => d.snakeGameId
                ) as GameQueryResponseData[]) || [];

              return (
                <>
                  <HeadingText
                    type={HeadingText.TYPE.HEADING_3}
                    spacingType={[
                      HeadingText.SPACING_TYPE.NONE,
                      HeadingText.SPACING_TYPE.NONE,
                      HeadingText.SPACING_TYPE.MEDIUM,
                      HeadingText.SPACING_TYPE.NONE,
                    ]}
                  >
                    Select Game(s)
                  </HeadingText>
                  <GameList games={games} />
                </>
              );
            }}
          </NrqlQuery>
        </StackItem>
      )}
    </Stack>
  );
};

export default GamePicker;
