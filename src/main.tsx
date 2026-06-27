import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const start = performance.now();
const MIN_LOAD_MS = 5000;

function ready() {
  const elapsed = performance.now() - start;
  const remaining = MIN_LOAD_MS - elapsed;
  if (remaining > 0) {
    setTimeout(() => createRoot(document.getElementById("root")!).render(
      <StrictMode><App /></StrictMode>,
    ), remaining);
  } else {
    createRoot(document.getElementById("root")!).render(
      <StrictMode><App /></StrictMode>,
    );
  }
}

ready();
