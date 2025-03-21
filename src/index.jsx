import React from "react";
import ReactDOM from "react-dom/client";
import UserService from "./services/userServices";
import HTTPService from "./services/httpService";

import "./index.css";

import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
async function initApp() {
  UserService.initKeycloak(renderApp);
  HTTPService.configure();
}

initApp();
