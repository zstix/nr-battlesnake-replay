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

const reducer = (state: StoreState, action: StoreAction): StoreState => {
  const { games } = state;
  const { id, turns } = action.payload;

  switch (action.type) {
    case ACTIONS.SHOW:
      return {
        ...state,
        games: addGame(id, state.games),
      };

    case ACTIONS.HIDE:
      const gamesWithHidden = {
        ...games,
        [id]: {
          ...games[id],
          showing: false,
        },
      };
      return { ...state, games: gamesWithHidden };

    case ACTIONS.SET_TURNS:
      const gamesWithTurns = {
        ...games,
        [id]: {
          ...games[id],
          turns,
        },
      };
      return { ...state, games: gamesWithTurns };

    default:
      return state;
  }
};

export default reducer;
