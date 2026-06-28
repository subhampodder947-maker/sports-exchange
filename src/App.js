import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import InPlay from "./pages/InPlay";
import Sports from "./pages/Sports";
import Account from "./pages/Account";
import Bets from "./pages/Bets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inplay" element={<InPlay />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/bets" element={<Bets />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;