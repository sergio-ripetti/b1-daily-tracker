import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializeDemoDataIfNeeded } from "./utils/initializationHelper";
import "./index.css";

// Initialize demo data synchronously before React renders
// This ensures localStorage is populated before any component reads from it
initializeDemoDataIfNeeded();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
