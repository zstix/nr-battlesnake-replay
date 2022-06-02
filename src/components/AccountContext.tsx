import * as React from "react";

type AccountContextType = {
  account: number;
  setAccount: (account: number) => void;
};

export const AccountContext = React.createContext<AccountContextType>({
  account: 0,
  setAccount: () => {},
});

export const AccountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = React.useState<number>(0);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
