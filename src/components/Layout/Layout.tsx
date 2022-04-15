import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppInitialize } from "../../hooks";
import { Preloader, Header } from "../../components";

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
