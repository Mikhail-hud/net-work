import { theme } from "antd";
import { createContext, FC, useEffect, useState, PropsWithChildren } from "react";

export type ColorScheme = "light" | "dark";
export type ModeSetting = ColorScheme | "system";

export interface ColorSchemeContextProps {
    mode: ModeSetting;
    resolvedMode: ColorScheme;
    setMode: (mode: ModeSetting) => void;
    algorithm: typeof theme.darkAlgorithm | typeof theme.defaultAlgorithm;
}

const STORAGE_KEY = "preferred-color-scheme";

const getInitialMode = (): ModeSetting => {
    const saved = localStorage.getItem(STORAGE_KEY) as ModeSetting;
    return saved ? saved : "system";
};

const getSystemScheme = (): ColorScheme =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ColorSchemeContext = createContext<ColorSchemeContextProps | null>(null);

export const ColorSchemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [mode, setModeState] = useState<ModeSetting>(getInitialMode);
    const [resolvedMode, setResolvedMode] = useState<ColorScheme>(mode === "system" ? getSystemScheme() : mode);

    const setMode = (newMode: ModeSetting): void => {
        localStorage.setItem(STORAGE_KEY, newMode);
        setModeState(newMode);
        setResolvedMode(newMode === "system" ? getSystemScheme() : newMode);
    };

    useEffect(() => {
        const media: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent): void => {
            if (mode === "system") {
                setResolvedMode(e.matches ? "dark" : "light");
            }
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, [mode]);

    const algorithm = resolvedMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm;

    return (
        <ColorSchemeContext.Provider value={{ mode, setMode, algorithm, resolvedMode }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};
