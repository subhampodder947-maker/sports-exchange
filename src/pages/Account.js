function Account() {
  return (
    <div className="container mt-4 pb-5">

      <h2>👤 My Account</h2>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h4>Wallet</h4>

          <p><b>Balance:</b> 9950.00</p>
          <p><b>Available:</b> 9900.00</p>
          <p><b>Exposure:</b> 50.00</p>
        </div>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h4>Statistics</h4>

          <p>Total Bets: 1</p>
          <p>Won: 0</p>
          <p>Lost: 0</p>
          <p>Open: 1</p>

          <p>Profit/Loss: 0.00</p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <button className="btn btn-primary w-100 mb-2">
            Bet History
          </button>

          <button className="btn btn-success w-100 mb-2">
            Transaction History
          </button>

          <button className="btn btn-warning w-100 mb-2">
            Reset Virtual Wallet
          </button>

          <button className="btn btn-danger w-100">
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}

export default Account;