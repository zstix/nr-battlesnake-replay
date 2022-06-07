import * as React from "react";
import { Stack, StackItem, Button } from "nr1";

import ACTIONS, { TURN_TARGETS } from "../store/actions";
import { ReplayContext } from "./ReplayContext";

interface ControlsProps {
  turn: number;
  maxTurn: number;
  id: string;
}

const Controls = ({ turn, maxTurn, id }: ControlsProps) => {
  const { state, dispatch } = React.useContext(ReplayContext);
  const { playing } = state.games[id];

  const playPauseIcon = playing
    ? Button.ICON_TYPE.INTERFACE__OPERATIONS__PAUSE
    : Button.ICON_TYPE.INTERFACE__OPERATIONS__PLAY;

  return (
    <Stack
      directionType={Stack.DIRECTION_TYPE.HORIZONTAL}
      horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
      verticalType={Stack.VERTICAL_TYPE.CENTER}
      spacingType={[Stack.SPACING_TYPE.MEDIUM, Stack.SPACING_TYPE.NONE]}
      className="bsr-controls"
      fullWidth
    >
      <div className="bsr-controls--step">
        {turn + 1} / {maxTurn}
      </div>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__SKIP_BACK}
          onClick={() => {
            dispatch!({
              type: ACTIONS.GOTO_TURN,
              payload: { id, target: TURN_TARGETS.FIRST },
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
              payload: { id, target: TURN_TARGETS.PREVIOUS },
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
              payload: { id },
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
              payload: { id, target: TURN_TARGETS.NEXT },
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
              payload: { id, target: TURN_TARGETS.LAST },
            });
          }}
        />
      </StackItem>
    </Stack>
  );
};

export default Controls;
