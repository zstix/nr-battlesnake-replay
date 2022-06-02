import * as React from "react";
import {
  InlineMessage,
  Spinner,
  Stack,
  StackItem,
  AccountPicker,
  NrqlQuery,
  HeadingText,
  PlatformState,
  PlatformStateContext,
} from "nr1";

import timeRangeToNrql from "../utils/timeRangeToNrql";
import { AccountContext } from "./AccountContext";
import GameList from "./GameList";

const getGameQuery = (platformState: PlatformState) => `
  SELECT snakeGameId, snakeGameIsWin, snakeGameWinnerId
  FROM Transaction
  WHERE path = '/end'
  ${timeRangeToNrql(platformState)}
`;

const GamePicker = () => {
  const { account, setAccount } = React.useContext(AccountContext);

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

      {Boolean(account) && (
        <StackItem style={{ width: "90%" }}>
          <PlatformStateContext.Consumer>
            {(platformState) => (
              <NrqlQuery
                accountIds={[account]}
                query={getGameQuery(platformState)}
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
            )}
          </PlatformStateContext.Consumer>
        </StackItem>
      )}
    </Stack>
  );
};

export default GamePicker;
