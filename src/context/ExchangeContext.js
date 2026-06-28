import { createContext, useState } from "react";

export const ExchangeContext = createContext();

export function ExchangeProvider({ children }) {
  const [balance, setBalance] = useState(10000);
  const [exposure, setExposure] = useState(0);
  const [bets, setBets] = useState([]);
  const [settledBets, setSettledBets] = useState([]);

  return (
    <ExchangeContext.Provider
      value={{
        balance,
        setBalance,
        exposure,
        setExposure,
        bets,
        setBets,
        settledBets,
        setSettledBets,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}