function BetSlip({
  selected,
  stake,
  setStake,
  backProfit,
  layLiability,
  requiredPoints,
  placeBet,
  clearSlip,
}) {
  if (!selected) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        top: "90px",
        width: "320px",
        background: "#fff",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,.25)",
        zIndex: 999,
      }}
    >
      <h5>🎫 Bet Slip</h5>

      <p>{selected.match}</p>

      <b>
        {selected.type} @ {selected.odds}
      </b>

      <input
        className="form-control mt-3"
        placeholder="Stake"
        value={stake}
        onChange={(e) => setStake(e.target.value)}
      />

      <div className="d-flex gap-2 mt-3">
        {[10, 50, 100, 500, 1000].map((x) => (
          <button
            key={x}
            className="btn btn-outline-dark flex-fill"
            onClick={() => setStake(String(x))}
          >
            {x}
          </button>
        ))}
      </div>

      {selected.type === "BACK" ? (
        <p className="mt-3">
          Profit: <b>{backProfit}</b>
        </p>
      ) : (
        <p className="mt-3 text-danger">
          Liability: <b>{layLiability}</b>
        </p>
      )}

      <p>Required: {requiredPoints}</p>

      <div className="d-flex gap-2">
        <button
          className="btn btn-secondary w-50"
          onClick={clearSlip}
        >
          Clear
        </button>

        <button
          className="btn btn-success w-50"
          onClick={placeBet}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BetSlip;