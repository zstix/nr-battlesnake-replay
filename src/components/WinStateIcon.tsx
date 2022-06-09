import * as React from "react";
import { Icon } from "nr1";

interface WinStateIconProps {
  game: GameQueryResponseData;
}

const WinStateIcon = ({ game }: WinStateIconProps) => {
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

export default WinStateIcon;
