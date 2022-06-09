import * as React from "react";

import { StoreAction } from "../store";
import ACTIONS, { TURN_TARGETS } from "../store/actions";

const useGameTimer = (
  id: string,
  game: ReplayGame,
  dispatch: React.Dispatch<StoreAction>
) => {
  const { playing, turn, turns } = game;

  React.useEffect(() => {
    let intervalId: number;

    if (playing) {
      if (turns && turn + 1 > turns.length - 1) {
        dispatch({
          type: ACTIONS.PLAY_PAUSE,
          payload: { id },
        });
        return () => clearInterval(intervalId);
      }
      intervalId = setInterval(() => {
        dispatch({
          type: ACTIONS.GOTO_TURN,
          payload: { id, target: TURN_TARGETS.NEXT },
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [playing, turn]);
};

export default useGameTimer;
