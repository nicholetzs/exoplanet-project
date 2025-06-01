import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

console.log("main.jsx carregado"); // Debug

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
