function MatchCard({
  match,
  ladder,
  isFinished,
  formatTime,
  settleMarket,
  setSelected,
}) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">

        <h5>{match.name}</h5>

        <p className="text-primary fw-bold mb-1">
          {match.series}
        </p>

        <p className="text-muted mb-1">
          📍 {match.venue}
        </p>

        <p className="text-muted">
          Starts In: {formatTime(match.startTime)}
        </p>

        <span
          className={
            isFinished
              ? "badge bg-secondary"
              : match.status === "Live"
              ? "badge bg-success"
              : "badge bg-warning text-dark"
          }
        >
          {match.status}
        </span>

        {!isFinished && (
          <button
            className="btn btn-success btn-sm ms-2"
            onClick={() => settleMarket(match.name)}
          >
            Settle Market
          </button>
        )}

        {match.score?.length > 0 && (
          <div className="alert alert-info mt-3 py-2">
            {match.score.map((inning, index) => (
              <div key={index}>
                <b>{inning.inning}</b> : {inning.r}/{inning.w} ({inning.o} ov)
              </div>
            ))}
          </div>
        )}

        <div className="row text-center fw-bold mt-3">
          <div className="col">BACK</div>
          <div className="col">LAY</div>
        </div>

        <div className="row g-1 mt-1">
          <div className="col d-flex gap-1">
            {ladder.back.map((odds) => (
              <button
                key={`back-${match.id}-${odds}`}
                className="btn btn-info flex-fill"
                disabled={isFinished}
                onClick={() =>
                  setSelected({
                    match: match.name,
                    type: "BACK",
                    odds,
                  })
                }
              >
                {odds}
                <br />
                <small>1000</small>
              </button>
            ))}
          </div>

          <div className="col d-flex gap-1">
            {ladder.lay.map((odds) => (
              <button
                key={`lay-${match.id}-${odds}`}
                className="btn btn-danger flex-fill"
                disabled={isFinished}
                onClick={() =>
                  setSelected({
                    match: match.name,
                    type: "LAY",
                    odds,
                  })
                }
              >
                {odds}
                <br />
                <small>1000</small>
              </button>
            ))}
          </div>
        </div>

        {isFinished && (
          <div className="alert alert-secondary mt-3">
            Market Suspended
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchCard;