import * as React from "react";
import { Layout, LayoutItem } from "nr1";

import GamePicker from "../../src/components/GamePicker";

const ReplayNerdlet = () => (
  <Layout>
    <LayoutItem
      type={LayoutItem.TYPE.SPLIT_LEFT}
      sizeType={LayoutItem.SIZE_TYPE.MEDIUM}
    >
      <GamePicker />
    </LayoutItem>
    <LayoutItem>Main content</LayoutItem>
  </Layout>
);

export default ReplayNerdlet;
