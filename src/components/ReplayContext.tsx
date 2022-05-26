import * as React from "react";

type ReplayContextType = {
  account: number;
  setAccount: (account: number) => void;
  gameIds: string[];
  setGameIds: (gameIds: string[]) => void;
};

export const ReplayContext = React.createContext<ReplayContextType>({
  gameIds: [],
  setGameIds: () => {},
  account: 0,
  setAccount: () => {},
});

export const ReplayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gameIds, setGameIds] = React.useState<string[]>([]);
  const [account, setAccount] = React.useState<number>(0);

  return (
    <ReplayContext.Provider
      value={{ gameIds, setGameIds, account, setAccount }}
    >
      {children}
    </ReplayContext.Provider>
  );
};
