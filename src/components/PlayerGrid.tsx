import * as React from "react";
import { Grid, GridItem, HeadingText } from "nr1";

import { ReplayContext } from "./ReplayContext";

const PlayerGrid = () => {
  const { gameIds } = React.useContext(ReplayContext);

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
        {gameIds.map((id) => (
          <GridItem
            key={id}
            columnSpan={4}
            style={{ backgroundColor: "silver" }}
          >
            {id}
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default PlayerGrid;
