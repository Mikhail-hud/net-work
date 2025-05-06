import React from "react";
import "antd/dist/antd.css";
import "./style/main.scss";
import App from "./App";
import { setupStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const store = setupStore();
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
