import * as React from "react";

type ReplayContextType = {
  games: ReplayGames;
  setGames: (games: ReplayGames) => void;
};

export const ReplayContext = React.createContext<ReplayContextType>({
  games: {},
  setGames: () => {},
});

export const ReplayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [games, setGames] = React.useState<ReplayGames>({});

  return (
    <ReplayContext.Provider value={{ games, setGames }}>
      {children}
    </ReplayContext.Provider>
  );
};
