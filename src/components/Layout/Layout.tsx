import { FC } from "react";
import { Layout } from "antd";
import { useAppInitialize } from "@hooks";
import { Outlet } from "react-router-dom";
import { Preloader, AppHeader, ThemeFloatButton } from "@components";

export const AppLayout: FC = () => {
    const { initialized } = useAppInitialize();
    if (!initialized) {
        return <Preloader />;
    }
    return (
        <Layout>
            <AppHeader />
            <Outlet />
            <ThemeFloatButton />
        </Layout>
    );
};
