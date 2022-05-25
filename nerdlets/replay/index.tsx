import * as React from "react";
import { Layout, LayoutItem } from "nr1";

const ReplayNerdlet = () => (
  <Layout>
    <LayoutItem
      type={LayoutItem.TYPE.SPLIT_LEFT}
      sizeType={LayoutItem.SIZE_TYPE.MEDIUM}
    >
      Game picker
    </LayoutItem>
    <LayoutItem>Main content</LayoutItem>
  </Layout>
);

export default ReplayNerdlet;
