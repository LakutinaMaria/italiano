import React from "react";
import ReactDOM from "react-dom/client";
import UserService from "./services/userServices.tsx";
import HTTPService from "./services/httpService.tsx";

import "./index.css";
import App from "./App.tsx";

function renderApp(): void {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

async function initApp(): Promise<void> {
  UserService.initKeycloak(renderApp);
  HTTPService.configure();
}

initApp();
