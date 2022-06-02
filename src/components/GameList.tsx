import * as React from "react";
import { Tile, TileGroup, Icon } from "nr1";

import { ReplayContext } from "./ReplayContext";

interface GameListProps {
  games: GameQueryResponseData[];
}

const getWinState = (game: GameQueryResponseData) => {
  if (!game.snakeGameId) {
    return (
      <Icon
        color="orange"
        type={Icon.TYPE.INTERFACE__SIGN__MINUS__V_ALTERNATE}
      />
    );
  }

  return game.snakeGameIsWin ? (
    <Icon
      color="green"
      type={Icon.TYPE.INTERFACE__SIGN__CHECKMARK__V_ALTERNATE}
    />
  ) : (
    <Icon
      color="red"
      type={Icon.TYPE.INTERFACE__OPERATIONS__CLOSE__V_ALTERNATE}
    />
  );
};

const addGame = (id: string, games: ReplayGames) => {
  if (!games[id]) {
    return { ...games, [id]: { showing: true } };
  }

  return {
    ...games,
    [id]: {
      ...games[id],
      showing: true,
    },
  };
};

const removeGame = (id: string, games: ReplayGames) => ({
  ...games,
  [id]: {
    ...games[id],
    showing: false,
  },
});

const GameList = (props: GameListProps) => {
  const { games, setGames } = React.useContext(ReplayContext);

  return (
    <TileGroup
      selectionType={TileGroup.SELECTION_TYPE.MULTIPLE}
      gapType={TileGroup.GAP_TYPE.SMALL}
      onChange={(_e, id, checked) => {
        if (checked) {
          setGames(addGame(id, games));
        } else {
          setGames(removeGame(id, games));
        }
      }}
    >
      {props.games.map((game, i) => (
        <Tile key={i} value={game.snakeGameId} sizeType={Tile.SIZE_TYPE.SMALL}>
          {getWinState(game)} {game.snakeGameId}
        </Tile>
      ))}
    </TileGroup>
  );
};

export default GameList;
