import { useThemeConfig } from "@components";
import { FC, PropsWithChildren } from "react";
import { ConfigProvider, App, ThemeConfig } from "antd";

export const ThemeConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const theme: ThemeConfig = useThemeConfig();
    return (
        <ConfigProvider theme={theme}>
            <App>{children}</App>
        </ConfigProvider>
    );
};
