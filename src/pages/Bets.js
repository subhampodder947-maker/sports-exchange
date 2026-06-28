import { useContext, useState } from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import BottomMenu from "../components/BottomMenu";

function Bets() {
  const { bets, settledBets } = useContext(ExchangeContext);
  const [tab, setTab] = useState("open");

  const data = tab === "open" ? bets : settledBets;

  return (
    <div className="container mt-4 pb-5">
      <h2>🎫 My Bets</h2>

      <div className="btn-group mb-3 w-100">
        <button
          className={tab === "open" ? "btn btn-primary" : "btn btn-outline-primary"}
          onClick={() => setTab("open")}
        >
          Open
        </button>

        <button
          className={tab === "settled" ? "btn btn-success" : "btn btn-outline-success"}
          onClick={() => setTab("settled")}
        >
          Settled
        </button>
      </div>

      {data.length === 0 && (
        <div className="alert alert-light border">
          No {tab} bets available.
        </div>
      )}

      {data.map((b) => (
        <div
          key={b.id}
          className={
            b.status === "Won"
              ? "alert alert-success"
              : b.status === "Lost"
              ? "alert alert-danger"
              : "alert alert-secondary"
          }
        >
          <b>{b.match}</b>
          <br />
          {b.type} @ {b.odds}
          <br />
          Stake: {b.stake} | Profit: {b.profit} | Liability: {b.liability}
          <br />
          Status: {b.status}
        </div>
      ))}

      <BottomMenu />
    </div>
  );
}

export default Bets;