import * as React from "react";
import { Grid, GridItem, HeadingText } from "nr1";

import { ReplayContext } from "./ReplayContext";
import Player from "./Player";

const PlayerGrid = () => {
  const { games } = React.useContext(ReplayContext);

  const gameIds = Object.entries(games).reduce<string[]>((ids, [id, game]) => {
    if (game.showing) {
      return [...ids, id];
    }
    return ids;
  }, []);

  return (
    <div style={{ paddingRight: "1em" }}>
      <HeadingText
        type={HeadingText.TYPE.HEADING_3}
        spacingType={[
          HeadingText.SPACING_TYPE.MEDIUM,
          HeadingText.SPACING_TYPE.NONE,
        ]}
      >
        {gameIds.length ? "View" : "Pick"} Game(s)
      </HeadingText>
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
