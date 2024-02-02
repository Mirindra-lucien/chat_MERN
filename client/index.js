import React from "react";
import reactDOM from "react-dom/client";
import App from "./app";

const doc = document.getElementById('root');
const root = reactDOM.createRoot(doc);
root.render(<App/>);