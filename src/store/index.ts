import ACTIONS, { TURN_TARGETS } from "./actions";

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
  const game = games[id];

  switch (target) {
    case TURN_TARGETS.NEXT:
      if (game.turn < game.turns!.length) {
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

    // TODO: GET THE LAST TURN
    case TURN_TARGETS.LAST:
      game.turn = game.turns!.length - 2;
      break;
  }

  return { ...games, [id]: game };
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
      updatedGames = {
        ...games,
        [id]: {
          ...games[id],
          playing: !games[id].playing,
        },
      };
      return { ...state, games: updatedGames };

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
