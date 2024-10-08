import ReactDOM from "react-dom";

import { ContextProvider } from "helpers/context";
import App from "containers/App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
