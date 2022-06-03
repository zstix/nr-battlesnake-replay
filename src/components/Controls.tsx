import * as React from "react";
import { Stack, StackItem, Button } from "nr1";

interface ControlsProps {
  turn: number;
  maxTurn: number;
}

const Controls = ({ turn, maxTurn }: ControlsProps) => (
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
        iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__PLAY}
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

export default Controls;
