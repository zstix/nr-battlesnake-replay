import * as React from "react";

type FIXME = any;

interface PlatformStateTimeRange {
  beginTime?: number;
  endTime?: number;
  begin_time?: number;
  end_time?: number;
  duration: number;
}

interface PlatformState {
  timeRange: PlatformStateTimeRange;
}

declare module "nr1" {
  interface BaseProps {
    children?: React.ReactNode;
    className?: string;
    style?: any;
  }

  // Structure \\

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

  enum StackDirectionType {
    HORIZONTAL,
    VERTICAL,
  }

  enum StackGapType {
    EXTRA_LARGE,
    LARGE,
    MEDIUM,
    NONE,
    SMALL,
  }

  enum StackSpacingType {
    EXTRA_LARGE,
    LARGE,
    MEDIUM,
    NONE,
    SMALL,
  }

  enum StackHorizontalType {
    CENTER,
    FILL,
    FILL_EVENLY,
    LEFT,
    RIGHT,
  }

  enum StackVerticalType {
    BOTTOM,
    CENTER,
    FILL,
    FILL_EVENLY,
    TOP,
  }

  interface StackProps extends BaseProps {
    directionType?: StackDirectionType;
    gapType?: StackGapType;
    spacingType?: StackSpacingType[];
    fullWidth?: boolean;
    horizontalType?: StackHorizontalType;
    verticalType?: StackVerticalType;
  }

  export class Stack extends React.Component<StackProps> {
    static DIRECTION_TYPE = StackDirectionType;
    static GAP_TYPE = StackGapType;
    static SPACING_TYPE = StackSpacingType;
    static HORIZONTAL_TYPE = StackHorizontalType;
    static VERTICAL_TYPE = StackVerticalType;
  }

  export class StackItem extends React.Component<BaseProps> {}

  interface TableProps {
    items: any[];
    children: (React.ReactNode | ((item: any) => React.ReactNode))[];
  }

  export class Table extends React.Component<TableProps> {}

  export class TableHeader extends React.Component<BaseProps> {}

  interface TableHeaderCellProps extends BaseProps {
    value?: (rawValue: any) => string | number | boolean;
    width?: string;
  }

  export class TableHeaderCell extends React.Component<TableHeaderCellProps> {}

  interface TableRowProps extends BaseProps {
    onClick?: (event: React.MouseEvent) => void;
  }

  export class TableRow extends React.Component<TableRowProps> {}

  export class TableRowCell extends React.Component<BaseProps> {}

  enum TileSizeType {
    MEDIUM,
    SMALL,
  }

  enum TileSpacingType {
    EXTRA_LARGE,
    LARGE,
    MEDIUM,
    NONE,
    OMIT,
    SMALL,
  }

  interface TileProps extends BaseProps {
    sizeType?: TileSizeType;
    spacingType?: TileSpacingType[];
    value?: string | number;
  }

  export class Tile extends React.Component<TileProps> {
    static SIZE_TYPE = TileSizeType;
    static SPACING_TYPE = TileSpacingType;
  }

  enum TileGroupSelectionType {
    MULTIPLE,
    NONE,
    SINGLE,
  }

  enum TileGroupGapType {
    MEDIUM,
    SMALL,
  }

  enum TileGroupSpacingType {
    EXTRA_LARGE,
    LARGE,
    MEDIUM,
    NONE,
    OMIT,
    SMALL,
  }

  interface TileGroupProps extends BaseProps {
    selectionType?: TileGroupSelectionType;
    gapType?: TileGroupGapType;
    spacingType?: TileGroupSpacingType[];
    onChange?: (
      event: React.MouseEvent,
      tileValue: any,
      checked: boolean
    ) => void;
    tileWidth?: string | number;
  }

  export class TileGroup extends React.Component<TileGroupProps> {
    static SELECTION_TYPE = TileGroupSelectionType;
    static GAP_TYPE = TileGroupGapType;
    static SPACING_TYPE = TileGroupSpacingType;
  }

  // Text \\

  enum HeadingTextType {
    HEADING_1,
    HEADING_2,
    HEADING_3,
    HEADING_4,
    HEADING_5,
    HEADING_6,
  }

  enum HeadingTextSpacingType {
    EXTRA_LARGE,
    LARGE,
    MEDIUM,
    NONE,
    OMIT,
    SMALL,
  }

  interface HeadingTextProps extends BaseProps {
    type?: HeadingTextType;
    spacingType?: HeadingTextSpacingType[];
  }

  export class HeadingText extends React.Component<HeadingTextProps> {
    static TYPE = HeadingTextType;
    static SPACING_TYPE = HeadingTextSpacingType;
  }

  // Feedback \\

  export class Spinner extends React.Component<{}> {}

  enum InlineMessageType {
    CRITICAL,
    INFO,
    SUCCESS,
    WARNING,
  }

  interface InlineMessageProps {
    type: InlineMessageType;
    label: string;
  }

  export class InlineMessage extends React.Component<InlineMessageProps> {
    static TYPE = InlineMessageType;
  }

  enum GridGapType {
    MEDIUM,
    SMALL,
  }

  interface GridProps extends BaseProps {
    gapType?: GridGapType;
  }

  export class Grid extends React.Component<GridProps> {
    static GAP_TYPE = GridGapType;
  }

  interface GridItemProps extends BaseProps {
    columnSpan?: number;
    columnStart?: number;
    columnEnd?: number;
    collapseGapAfter?: boolean;
    collapseGapBefore?: boolean;
  }

  export class GridItem extends React.Component<GridItemProps> {}

  enum IconType {
    INTERFACE__SIGN__CHECKMARK__V_ALTERNATE,
    INTERFACE__OPERATIONS__CLOSE__V_ALTERNATE,
    INTERFACE__SIGN__MINUS__V_ALTERNATE,
    INTERFACE__OPERATIONS__SKIP_BACK,
    INTERFACE__OPERATIONS__SKIP_FORWARD,
    INTERFACE__CHEVRON__CHEVRON_LEFT,
    INTERFACE__CHEVRON__CHEVRON_RIGHT,
    INTERFACE__OPERATIONS__PLAY,
    INTERFACE__OPERATIONS__PAUSE,
  }

  interface IconProps {
    type: IconType;
    color?: string;
  }

  export class Icon extends React.Component<IconProps> {
    static TYPE = IconType;
  }

  // Queries \\

  interface AccountPickerProps {
    value: number | undefined;
    onChange: (event: React.MouseEvent, value: number) => void;
    label?: string;
    disabled?: boolean;
  }

  export class AccountPicker extends React.Component<AccountPickerProps> {}

  interface QueryResult {
    loading: boolean;
    error: FIXME;
    data: FIXME;
  }

  interface NrqlQueryProps {
    accountIds: number[];
    query: string;
    children: (queryResult: QueryResult) => React.ReactNode;
  }

  export class NrqlQuery extends React.Component<NrqlQueryProps> {}

  interface PlatformStateContextConsumerProps {
    children: (state: PlatformState) => React.ReactNode;
  }

  class PlatformStateConsumer extends React.Component<PlatformStateContextConsumerProps> {}

  export class PlatformStateContext {
    static Consumer = PlatformStateConsumer;
  }

  // Controls \\

  enum ButtonType {
    DESTRUCTIVE,
    NORMAL,
    OUTLINE,
    PLAIN,
    PLAIN_NEUTRAL,
    PRIMARY,
    TERTIARY,
  }

  enum ButtonSize {
    SMALL,
    MEDIUM,
    LARGE,
  }

  interface ButtonProps extends BaseProps {
    type?: ButtonType;
    sizeType?: ButtonSize;
    onClick?: (event: React.MouseEvent) => void;
    iconType?: IconType;
  }

  class Button extends React.Component<ButtonProps> {
    static TYPE = ButtonType;
    static ICON_TYPE = IconType;
  }
}
