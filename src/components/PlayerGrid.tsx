import * as React from "react";
import { Grid, GridItem, HeadingText, Stack, StackItem } from "nr1";

import { ReplayContext } from "./ReplayContext";
import Player from "./Player";
import Controls from "./Controls";

const PlayerGrid = () => {
  const { state } = React.useContext(ReplayContext);

  const gameIds = Object.entries(state.games).reduce<string[]>(
    (ids, [id, game]) => {
      if (game.showing) {
        return [...ids, id];
      }
      return ids;
    },
    []
  );

  return (
    <div style={{ padding: "0 1rem" }}>
      <Stack
        directionType={Stack.DIRECTION_TYPE.HORIZONTAL}
        horizontalType={Stack.HORIZONTAL_TYPE.FILL}
        verticalType={Stack.VERTICAL_TYPE.CENTER}
        fullWidth
      >
        <StackItem>
          <HeadingText
            type={HeadingText.TYPE.HEADING_3}
            spacingType={[
              HeadingText.SPACING_TYPE.MEDIUM,
              HeadingText.SPACING_TYPE.NONE,
            ]}
          >
            {gameIds.length ? "View" : "Pick"} Game(s)
          </HeadingText>
        </StackItem>
        <StackItem>
          <Controls turn={0} maxTurn={0} />
        </StackItem>
      </Stack>
      <Grid>
        {gameIds.map((gameId) => (
          <GridItem key={gameId} columnSpan={4}>
            <Player gameId={gameId} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default PlayerGrid;
