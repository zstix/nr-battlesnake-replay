import * as React from "react";

import { ReplayContext } from "./ReplayContext";

const PlayerGrid = () => {
  const { gameIds } = React.useContext(ReplayContext);

  return (
    <ul>
      {gameIds.map((id) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  );
};

export default PlayerGrid;
