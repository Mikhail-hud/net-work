import { FloatButton } from "antd";
import { FC, ReactNode } from "react";
import { ModeSetting, useColorScheme } from "@components";
import { MoonOutlined, SunOutlined, DesktopOutlined } from "@ant-design/icons";

const icons: Record<ModeSetting, ReactNode> = {
    light: <SunOutlined />,
    dark: <MoonOutlined />,
    system: <DesktopOutlined />,
};

export const ThemeFloatButton: FC = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <FloatButton.Group trigger="hover" type="primary" icon={icons[mode]}>
            <FloatButton
                type={mode === "light" ? "primary" : "default"}
                onClick={() => setMode("light")}
                icon={<SunOutlined />}
            />
            <FloatButton
                type={mode === "dark" ? "primary" : "default"}
                onClick={() => setMode("dark")}
                icon={<MoonOutlined />}
            />
            <FloatButton
                type={mode === "system" ? "primary" : "default"}
                onClick={() => setMode("system")}
                icon={<DesktopOutlined />}
            />
        </FloatButton.Group>
    );
};
