import { ThemeConfig } from "antd";
import { useColorScheme } from "@components";
import { COLORS_ALGORITHM } from "@constants/theme";

export const useThemeConfig = (): ThemeConfig => {
    const { algorithm, resolvedMode } = useColorScheme();
    const colorScheme = COLORS_ALGORITHM[resolvedMode];

    useEffect((): void => {
        // Set CSS variables for the theme
        const root: HTMLElement = document.documentElement;
        for (const [key, value] of Object.entries(colorScheme)) {
            root.style.setProperty(`--${key}`, value);
        }
    }, [colorScheme]);

    const token: ThemeConfig["token"] = {
        fontFamily: "IBM Plex Serif, serif",
        fontWeightStrong: 500,
        colorBgLayout: colorScheme.colorBgBase,
        colorBgBase: colorScheme.colorBgBase,
        colorTextBase: colorScheme.colorTextBase,
        colorText: colorScheme.colorText,
        colorTextSecondary: colorScheme.colorTextSecondary,
        colorPrimary: colorScheme.colorPrimary,
        colorSuccess: colorScheme.colorSuccess,
        colorWarning: colorScheme.colorWarning,
        colorError: colorScheme.colorError,
    };
    const components: ThemeConfig["components"] = {
        Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
        },
        Layout: {
            headerBg: colorScheme.colorBgBase,
            headerPadding: "0 20px",
        },
        Input: {
            activeShadow: colorScheme.colorPrimary,
            errorActiveShadow: colorScheme.colorError,
            warningActiveShadow: colorScheme.colorWarning,
        },
        Menu: {
            colorBgContainer: colorScheme.colorBgBase,
        },
        Button: {
            primaryShadow: colorScheme.colorPrimary,
        },
        Segmented: {
            itemColor: colorScheme.colorPrimary,
            itemSelectedColor: colorScheme.colorPrimary,
        },
    };
    return {
        token,
        algorithm,
        components,
    };
};
