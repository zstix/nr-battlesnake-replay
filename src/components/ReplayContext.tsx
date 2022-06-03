import * as React from "react";

import reducer, { StoreState, StoreAction } from "../store";

type ReplayContextType = {
  state: StoreState;
  dispatch?: React.Dispatch<StoreAction>;
};

const initState: StoreState = {
  games: {},
};

export const ReplayContext = React.createContext<ReplayContextType>({
  state: initState,
});

export const ReplayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <ReplayContext.Provider value={{ state, dispatch }}>
      {children}
    </ReplayContext.Provider>
  );
};
