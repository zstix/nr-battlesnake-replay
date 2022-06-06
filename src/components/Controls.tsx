import * as React from "react";
import { Stack, StackItem, Button } from "nr1";

import ACTIONS from "../store/actions";
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
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__CHEVRON__CHEVRON_LEFT}
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
        />
      </StackItem>

      <StackItem>
        <Button
          type={Button.TYPE.TERTIARY}
          iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__SKIP_FORWARD}
        />
      </StackItem>
    </Stack>
  );
};

export default Controls;
