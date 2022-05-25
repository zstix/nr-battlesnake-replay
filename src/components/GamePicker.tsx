import * as React from "react";
import { Stack, StackItem, AccountPicker, NrqlQuery } from "nr1";

const GAME_QUERY = "";

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
              console.log(loading, error, data);
              return <div>Hey</div>;
            }}
          </NrqlQuery>
        </StackItem>
      )}
    </Stack>
  );
};

export default GamePicker;
