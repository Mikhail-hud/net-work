import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "./style/main.scss";
import App from "./App";
import { setupStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
