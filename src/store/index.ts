import ACTIONS, { StoreActionsTypes } from "./actions";

export interface StoreAction {
  type: StoreActionsTypes;
  payload: {
    id: string;
    turns?: TurnState[];
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

const reducer = (state: StoreState, action: StoreAction): StoreState => {
  const { games } = state;
  const { id, turns } = action.payload;
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

    default:
      return state;
  }
};

export default reducer;
