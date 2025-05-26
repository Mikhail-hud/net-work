import { FC } from "react";
import { Segmented } from "antd";
import { ModeSetting, useColorScheme } from "@components";
import { MoonOutlined, SunOutlined, DesktopOutlined } from "@ant-design/icons";

export const ThemeToggleSegment: FC = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <Segmented<ModeSetting>
            size="large"
            value={mode}
            onChange={setMode}
            options={[
                {
                    label: <DesktopOutlined />,
                    value: "system",
                    title: "System Mode",
                },
                {
                    label: <SunOutlined />,
                    value: "light",
                    title: "Light Mode",
                },
                {
                    label: <MoonOutlined />,
                    value: "dark",
                    title: "Dark Mode",
                },
            ]}
        />
    );
};
