import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import { ExchangeProvider } from "./context/ExchangeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ExchangeProvider>
    <App />
  </ExchangeProvider>
);