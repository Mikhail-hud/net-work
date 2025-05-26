import { useContext } from "react";
import { ColorSchemeContext, ColorSchemeContextProps } from "@components";

export const useColorScheme = (): ColorSchemeContextProps => {
    const ctx = useContext(ColorSchemeContext);
    if (!ctx) {
        throw new Error("useColorScheme must be used within ColorSchemeProvider");
    }
    return ctx;
};
