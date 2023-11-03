import { Mode } from "@/context/ExtendedThemeProvider/ExtendedThemeProviderProps";
import { PaletteMode } from "@mui/material";

export const getDefaultMode = (
    mode?: string | null,
    defaultValue: Mode = "system"
) => {
    if (mode !== "light" && mode !== "dark" && mode !== "system") {
        mode = defaultValue;
    }

    return mode as Mode;
};

export const getDefaultSystemMode = (
    systemMode?: string | null,
    defaultValue: PaletteMode = "light"
) => {
    if (systemMode !== "light" && systemMode !== "dark") {
        systemMode = defaultValue;
    }

    return systemMode as PaletteMode;
};
