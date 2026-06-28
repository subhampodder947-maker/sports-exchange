import { getMatches } from "../services/cricketApi";
import { useEffect, useState, useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import BottomMenu from "../components/BottomMenu";
import BetSlip from "../components/BetSlip";
import MarketList from "../components/MarketList";

function Home() {
  const {
    balance,
    setBalance,
    exposure,
    setExposure,
    bets,
    setBets,
    settledBets,
    setSettledBets,
  } = useContext(ExchangeContext);

  const [selected, setSelected] = useState(null);
  const [stake, setStake] = useState("");
  const [search, setSearch] = useState("");

  const [matches, setMatches] = useState([
    {
      id: 1,
      name: "England vs New Zealand",
      startTime: Date.now() + 5 * 60 * 1000,
      base: 2.15,
      status: "Upcoming",
      score: [],
      venue: "",
      series: "",
    },
  ]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches();

        const liveMatches = data.map((match, index) => ({
          id: match.id || index,
          name: `${match.teamInfo?.[0]?.name || "Team A"} vs ${
            match.teamInfo?.[1]?.name || "Team B"
          }`,
          startTime: match.dateTimeGMT
            ? new Date(match.dateTimeGMT).getTime()
            : Date.now() + (index + 1) * 5 * 60 * 1000,
          base: +(1.5 + Math.random()).toFixed(2),
          status: match.matchEnded
            ? "Finished"
            : match.matchStarted
            ? "Live"
            : "Upcoming",
          score: match.score || [],
          venue: match.venue || "",
          series: match.series || "",
        }));

        const uniqueMatches = liveMatches.filter(
          (match, index, self) =>
            index ===
            self.findIndex(
              (m) => m.name === match.name && m.series === match.series
            )
        );

        if (uniqueMatches.length > 0) {
          setMatches(uniqueMatches);
        }
      } catch (err) {
        console.error("Failed to load cricket matches:", err);
      }
    }

    loadMatches();

    const refresh = setInterval(loadMatches, 30000);

    return () => clearInterval(refresh);
  }, []);

  useEffect(() => {
    const oddsTimer = setInterval(() => {
      setMatches((old) =>
        old.map((m) => ({
          ...m,
          base:
            m.status === "Finished"
              ? m.base
              : Math.max(
                  1.01,
                  +(m.base + (Math.random() - 0.5) * 0.06).toFixed(2)
                ),
        }))
      );
    }, 3000);

    return () => clearInterval(oddsTimer);
  }, []);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setMatches((old) => [...old]);
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  const makeLadder = (base) => ({
    back: [
      +(base - 0.02).toFixed(2),
      +(base - 0.01).toFixed(2),
      +base.toFixed(2),
    ],
    lay: [
      +(base + 0.01).toFixed(2),
      +(base + 0.02).toFixed(2),
      +(base + 0.03).toFixed(2),
    ],
  });

  const filteredMatches = matches.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const amount = Number(stake) || 0;

  const backProfit =
    selected && selected.type === "BACK"
      ? ((selected.odds - 1) * amount).toFixed(2)
      : "0.00";

  const layLiability =
    selected && selected.type === "LAY"
      ? ((selected.odds - 1) * amount).toFixed(2)
      : "0.00";

  const requiredPoints =
    selected?.type === "LAY" ? Number(layLiability) : amount;

  const placeBet = () => {
    if (!selected || !amount) {
      alert("Select odds and enter stake");
      return;
    }

    if (requiredPoints > balance) {
      alert("Not enough virtual points");
      return;
    }

    const newBet = {
      id: Date.now(),
      match: selected.match,
      type: selected.type,
      odds: selected.odds,
      stake: amount,
      profit: selected.type === "BACK" ? Number(backProfit) : amount,
      liability: selected.type === "LAY" ? Number(layLiability) : amount,
      required: requiredPoints,
      status: "Open",
    };

    setBets([...bets, newBet]);
    setBalance(balance - requiredPoints);
    setExposure(exposure + requiredPoints);
    setStake("");
    setSelected(null);
  };

  const clearSlip = () => {
    setSelected(null);
    setStake("");
  };

  const settleMarket = (matchName) => {
    const matchBets = bets.filter(
      (b) => b.match === matchName && b.status === "Open"
    );

    if (matchBets.length === 0) {
      alert("No open bets for this match");
      return;
    }

    const result = Math.random() > 0.5 ? "BACK" : "LAY";

    let balanceChange = 0;
    let exposureRelease = 0;

    const settled = matchBets.map((bet) => {
      const won = bet.type === result;
      exposureRelease += bet.required;

      if (won) {
        balanceChange += bet.required + bet.profit;
      }

      return {
        ...bet,
        status: won ? "Won" : "Lost",
        result,
        pnl: won ? bet.profit : -bet.required,
      };
    });

    const remainingOpen = bets.filter((b) => b.match !== matchName);

    setBets(remainingOpen);
    setSettledBets([...settledBets, ...settled]);
    setBalance(balance + balanceChange);
    setExposure(Math.max(0, exposure - exposureRelease));

    setMatches((old) =>
      old.map((m) =>
        m.name === matchName ? { ...m, status: "Finished" } : m
      )
    );

    alert(`Market settled. Result: ${result}`);
  };

  const availableBalance = balance - exposure;

  const formatTime = (time) => {
    const diff = time - Date.now();

    if (diff <= 0) return "LIVE";

    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-dark text-white p-3 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">🏏 VirtualOddsHub</h3>
            <small className="text-warning">
              Live Virtual Sports Exchange
            </small>
          </div>

          <div className="text-end">
            <div className="fw-bold">Balance</div>
            <div className="text-success">₹ {balance.toFixed(2)}</div>
            <small className="text-danger">
              Exposure: ₹ {exposure.toFixed(2)}
            </small>
            <br />
            <small className="text-info">
              Available: ₹ {availableBalance.toFixed(2)}
            </small>
            <br />
            <small>Open Bets: {bets.length}</small>
          </div>
        </div>
      </div>

      <div className="bg-warning p-2 fw-bold">
        📢 No cash deposit, no withdrawal, no real prize
      </div>

      <div className="container mt-3 pb-5">
        <input
          className="form-control mb-3"
          placeholder="Search match..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">🔴 Live Cricket Markets</h4>

          <span className="badge bg-success">
            {filteredMatches.length} Markets
          </span>
        </div>

        <MarketList
          matches={filteredMatches}
          makeLadder={makeLadder}
          formatTime={formatTime}
          settleMarket={settleMarket}
          setSelected={setSelected}
        />

        <BetSlip
          selected={selected}
          stake={stake}
          setStake={setStake}
          backProfit={backProfit}
          layLiability={layLiability}
          requiredPoints={requiredPoints}
          placeBet={placeBet}
          clearSlip={clearSlip}
        />

        <h5>Open Bets</h5>

        {bets.length === 0 && (
          <div className="alert alert-light border">No open bets.</div>
        )}

        {bets.map((b) => (
          <div className="alert alert-secondary" key={b.id}>
            <b>{b.match}</b> — {b.type} @ {b.odds} — Stake: {b.stake} —
            Profit: {b.profit} — Liability: {b.liability} — Status:{" "}
            {b.status}
          </div>
        ))}

        <h5>Settled Bets</h5>

        {settledBets.length === 0 && (
          <div className="alert alert-light border">No settled bets.</div>
        )}

        {settledBets.map((b) => (
          <div
            className={
              b.status === "Won" ? "alert alert-success" : "alert alert-danger"
            }
            key={b.id}
          >
            <b>{b.match}</b> — {b.type} @ {b.odds} — Result: {b.result} —
            Status: {b.status} — P/L: {b.pnl}
          </div>
        ))}

        <BottomMenu />
      </div>
    </div>
  );
}

export default Home;