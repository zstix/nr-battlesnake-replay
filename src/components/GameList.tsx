import * as React from "react";
import { Tile, TileGroup } from "nr1";

import ACTIONS from "../store/actions";
import { ReplayContext } from "./ReplayContext";
import WinStateIcon from "./WinStateIcon";

interface GameListProps {
  games: GameQueryResponseData[];
}

const GameList = (props: GameListProps) => {
  const { dispatch } = React.useContext(ReplayContext);

  return (
    <TileGroup
      selectionType={TileGroup.SELECTION_TYPE.MULTIPLE}
      gapType={TileGroup.GAP_TYPE.SMALL}
      onChange={(_e, id: string, checked) => {
        if (checked) {
          dispatch!({ type: ACTIONS.SHOW, payload: { id } });
        } else {
          dispatch!({ type: ACTIONS.HIDE, payload: { id } });
        }
      }}
    >
      {props.games.map((game, i) => (
        <Tile key={i} value={game.snakeGameId} sizeType={Tile.SIZE_TYPE.SMALL}>
          <WinStateIcon game={game} /> {game.snakeGameId}
        </Tile>
      ))}
    </TileGroup>
  );
};

export default GameList;
