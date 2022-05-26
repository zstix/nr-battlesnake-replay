import * as React from "react";
import { Layout, LayoutItem } from "nr1";

import { ReplayContextProvider } from "../../src/components/ReplayContext";
import GamePicker from "../../src/components/GamePicker";
import PlayerGrid from "../../src/components/PlayerGrid";

const ReplayNerdlet = () => (
  <ReplayContextProvider>
    <Layout>
      <LayoutItem
        type={LayoutItem.TYPE.SPLIT_LEFT}
        sizeType={LayoutItem.SIZE_TYPE.MEDIUM}
      >
        <GamePicker />
      </LayoutItem>
      <LayoutItem>
        <PlayerGrid />
      </LayoutItem>
    </Layout>
  </ReplayContextProvider>
);

export default ReplayNerdlet;
