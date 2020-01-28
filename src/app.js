import React from "react";
import ReactDOMServer from "react-dom";
import App from "./components/App.js";
import "./app.scss";

ReactDOMServer.render(<App />, document.getElementById("app"));
