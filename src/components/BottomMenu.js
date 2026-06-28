import { Link } from "react-router-dom";

function BottomMenu() {
  return (
    <div
      className="fixed-bottom bg-dark text-white d-flex justify-content-around py-2"
      style={{ zIndex: 1000 }}
    >
      <Link
        to="/"
        className="text-white text-decoration-none text-center"
      >
        🏠
        <br />
        Home
      </Link>

      <Link
        to="/inplay"
        className="text-white text-decoration-none text-center"
      >
        ⚡
        <br />
        In Play
      </Link>

      <Link
        to="/sports"
        className="text-white text-decoration-none text-center"
      >
        🏆
        <br />
        Sports
      </Link>

      <Link
        to="/bets"
        className="text-white text-decoration-none text-center"
      >
        🎫
        <br />
        Bets
      </Link>

      <Link
        to="/account"
        className="text-white text-decoration-none text-center"
      >
        👤
        <br />
        Account
      </Link>
    </div>
  );
}

export default BottomMenu;