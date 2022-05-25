import * as React from "react";

declare module "nr1" {
  interface BaseProps {
    children: React.ReactNode;
    className?: string;
  }

  export class Layout extends React.Component<BaseProps> {}

  enum LayoutItemType {
    MAIN,
    SPLIT_LEFT,
    SPLIT_RIGHT,
  }

  enum LayoutItemSizeType {
    SMALL,
    MEDIUM,
  }

  interface LayoutItemProps extends BaseProps {
    type?: LayoutItemType;
    sizeType?: LayoutItemSizeType;
  }

  export class LayoutItem extends React.Component<LayoutItemProps> {
    static TYPE = LayoutItemType;
    static SIZE_TYPE = LayoutItemSizeType;
  }
}
