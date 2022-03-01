import React from "react";
import { Layout } from "antd";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { useAppInitialize } from "../../hooks/useAppInitialize";
import Preloader from "../presentational/Preloader";

const AppLayout: React.FC = (): JSX.Element => {
    const { initialized } = useAppInitialize();
    if (!initialized) {
        return <Preloader />;
    }
    return (
        <Layout>
            <Header />
            <Outlet />
        </Layout>
    );
};

export default AppLayout;
