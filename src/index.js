import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./custom.css";

import App from "./App.react";
import { Logger } from "./logger";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  throw new Error("Could not find root element to mount to!");
}

// ✅ Periodic test logs for Grafana
setInterval(() => {
  Logger.debug("🐛 Routine DEBUG log");
  Logger.info("ℹ️ Routine INFO log");
  Logger.warn("⚠️ Routine WARN log");
  Logger.error("❌ Routine ERROR log");
  Logger.critical("🚨 Routine CRITICAL log");
}, 30000); // every 30 sec

