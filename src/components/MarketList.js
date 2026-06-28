import MatchCard from "./MatchCard";

function MarketList({ matches, makeLadder, formatTime, settleMarket, setSelected }) {
  return (
    <>
      {matches.map((m, i) => {
        const ladder = makeLadder(m.base);
        const isFinished = m.status === "Finished";

        return (
          <MatchCard
            key={i}
            match={m}
            ladder={ladder}
            isFinished={isFinished}
            formatTime={formatTime}
            settleMarket={settleMarket}
            setSelected={setSelected}
          />
        );
      })}
    </>
  );
}

export default MarketList;