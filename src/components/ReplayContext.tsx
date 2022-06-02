import * as React from "react";

type ReplayContextType = {
  gameIds: string[];
  setGameIds: (gameIds: string[]) => void;
};

export const ReplayContext = React.createContext<ReplayContextType>({
  gameIds: [],
  setGameIds: () => {},
});

export const ReplayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gameIds, setGameIds] = React.useState<string[]>([]);

  return (
    <ReplayContext.Provider value={{ gameIds, setGameIds }}>
      {children}
    </ReplayContext.Provider>
  );
};
