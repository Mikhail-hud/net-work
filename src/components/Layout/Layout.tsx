import React from "react";
import { Layout } from "antd";
import { useAppInitialize } from "@hooks";
import { Outlet } from "react-router-dom";
import { Preloader, AppHeader } from "@components";

export const AppLayout: React.FC = () => {
    const { initialized } = useAppInitialize();
    if (!initialized) {
        return <Preloader />;
    }
    return (
        <Layout>
            <AppHeader />
            <Outlet />
        </Layout>
    );
};
