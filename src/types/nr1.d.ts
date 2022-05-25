import * as React from "react";

type FIXME = any;

declare module "nr1" {
  interface BaseProps {
    children: React.ReactNode;
    className?: string;
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

  interface StackProps extends BaseProps {
    directionType?: StackDirectionType;
    gapType?: StackGapType;
    spacingType?: [StackSpacingType];
  }

  export class Stack extends React.Component<StackProps> {
    static DIRECTION_TYPE = StackDirectionType;
    static GAP_TYPE = StackGapType;
    static SPACING_TYPE = StackSpacingType;
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
}
