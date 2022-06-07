import * as React from "react";
import { Stack, StackItem, Button } from "nr1";

import ACTIONS, { TURN_TARGETS } from "../store/actions";
import { ReplayContext } from "./ReplayContext";

const ALL = "ALL";

interface ControlsProps {
  turn: number;
  maxTurn: number;
  id?: string;
}

const Controls = ({ turn, maxTurn, id }: ControlsProps) => {
  const { state, dispatch } = React.useContext(ReplayContext);

  // if the global controls, only show when we have more than one game
  if (!id && Object.keys(state.games).length <= 1) {
    return null;
  }

  // TODO: sort this out
  const playing = id ? state.games[id].playing : false;

  const playPauseIcon = playing
    ? Button.ICON_TYPE.INTERFACE__OPERATIONS__PAUSE
    : Button.ICON_TYPE.INTERFACE__OPERATIONS__PLAY;

  const targetId = id || ALL;

  return (
    <Stack
      directionType={Stack.DIRECTION_TYPE.HORIZONTAL}
      horizontalType={Stack.HORIZONTAL_TYPE.RIGHT}
      verticalType={Stack.VERTICAL_TYPE.CENTER}
      spacingType={[Stack.SPACING_TYPE.MEDIUM, Stack.SPACING_TYPE.NONE]}
      className="bsr-controls"
      fullWidth
    >
      {id ? (
        <div className="bsr-controls--step">
          {turn + 1} / {maxTurn}
        </div>
      ) : (
        ""
      )}

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__SKIP_BACK}
          onClick={() => {
            dispatch!({
              type: ACTIONS.GOTO_TURN,
              payload: { id: targetId, target: TURN_TARGETS.FIRST },
            });
          }}
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__CHEVRON__CHEVRON_LEFT}
          onClick={() => {
            dispatch!({
              type: ACTIONS.GOTO_TURN,
              payload: { id: targetId, target: TURN_TARGETS.PREVIOUS },
            });
          }}
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={playPauseIcon}
          onClick={() => {
            dispatch!({
              type: ACTIONS.PLAY_PAUSE,
              payload: { id: targetId },
            });
          }}
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__CHEVRON__CHEVRON_RIGHT}
          onClick={() => {
            dispatch!({
              type: ACTIONS.GOTO_TURN,
              payload: { id: targetId, target: TURN_TARGETS.NEXT },
            });
          }}
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__SKIP_FORWARD}
          onClick={() => {
            dispatch!({
              type: ACTIONS.GOTO_TURN,
              payload: { id: targetId, target: TURN_TARGETS.LAST },
            });
          }}
        />
      </StackItem>
    </Stack>
  );
};

export default Controls;
