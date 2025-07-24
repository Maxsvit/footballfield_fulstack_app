// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n.ts";
import AppRouter from "./router/AppRouter.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
