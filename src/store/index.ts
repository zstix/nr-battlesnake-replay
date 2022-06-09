import ACTIONS, { TURN_TARGETS } from "./actions";

const ALL = "ALL";

export interface StoreAction {
  type: ACTIONS;
  payload: {
    id: string;
    turns?: TurnState[];
    target?: TURN_TARGETS;
  };
}

export interface StoreState {
  games: ReplayGames;
  allPlaying: boolean;
}

const addGame = (id: string, games: ReplayGames): ReplayGames => {
  if (!games[id]) {
    return { ...games, [id]: { showing: true, playing: false, turn: 0 } };
  }

  return {
    ...games,
    [id]: {
      ...games[id],
      showing: true,
    },
  };
};

const gotoTurn = (
  id: string,
  target: TURN_TARGETS,
  games: ReplayGames
): ReplayGames => {
  // if global controls (ALL), call this method on all games
  if (id === ALL) {
    return Object.keys(games).reduce(
      (acc, id) => gotoTurn(id, target, acc),
      games
    );
  }

  const game = games[id];

  switch (target) {
    case TURN_TARGETS.NEXT:
      if (game.turn < game.turns!.length - 1) {
        game.turn = game.turn + 1;
      }
      break;

    case TURN_TARGETS.PREVIOUS:
      if (game.turn > 0) {
        game.turn = game.turn - 1;
      }
      break;

    case TURN_TARGETS.FIRST:
      game.turn = 0;
      break;

    case TURN_TARGETS.LAST:
      game.turn = game.turns!.length - 1;
      break;
  }

  return { ...games, [id]: game };
};

const playPause = (id: string, games: ReplayGames): ReplayGames => {
  if (id === ALL) {
    return Object.entries(games).reduce(
      (acc, [id, game]) => ({
        ...acc,
        [id]: { ...game, playing: !game.playing },
      }),
      {}
    );
  }

  return {
    ...games,
    [id]: {
      ...games[id],
      playing: !games[id].playing,
    },
  };
};

const reducer = (state: StoreState, action: StoreAction): StoreState => {
  const { games } = state;
  const { id, turns, target } = action.payload;

  let updatedGames: ReplayGames = {};

  switch (action.type) {
    case ACTIONS.SHOW:
      return {
        ...state,
        games: addGame(id, state.games),
      };

    case ACTIONS.HIDE:
      updatedGames = {
        ...games,
        [id]: {
          ...games[id],
          showing: false,
        },
      };
      return { ...state, games: updatedGames };

    case ACTIONS.SET_TURNS:
      updatedGames = {
        ...games,
        [id]: {
          ...games[id],
          turns,
        },
      };
      return { ...state, games: updatedGames };

    case ACTIONS.PLAY_PAUSE:
      const allPlaying = !(state.allPlaying && id === ALL);
      return { ...state, allPlaying, games: playPause(id, games) };

    case ACTIONS.GOTO_TURN:
      return {
        ...state,
        games: gotoTurn(id, target!, state.games),
      };

    default:
      return state;
  }
};

export default reducer;
