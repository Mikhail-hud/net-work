import React from "react";
import "./style/main.scss";
import { store } from "@app/store";
import { App } from "@app/App.tsx";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ColorSchemeProvider, ThemeConfigProvider } from "@components";

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ColorSchemeProvider>
                <ThemeConfigProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeConfigProvider>
            </ColorSchemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
