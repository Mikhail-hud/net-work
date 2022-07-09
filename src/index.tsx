import { createRoot } from "react-dom/client";
import "antd/dist/antd.css";
import "./style/main.scss";
import App from "./App";
import { setupStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
