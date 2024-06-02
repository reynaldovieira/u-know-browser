import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
const url = document.URL;
// const urlSplited = url.split("/");

const rootElement = document.createElement("div");
rootElement.id = "root";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 9;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

ReactDOM.render(<App />, rootElement);
