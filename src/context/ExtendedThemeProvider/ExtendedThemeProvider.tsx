"use client";

import {
    ExtendedContextValue,
    ExtendedThemeProviderProps,
    Mode,
} from "@/context/ExtendedThemeProvider/ExtendedThemeProviderProps";
import { getTheme } from "@/theme";
import { getDefaultMode, getDefaultSystemMode } from "@/utils/themeMode";
import createCache from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import {
    CssBaseline,
    ThemeProvider,
    PaletteMode,
    GlobalStyles,
} from "@mui/material";
import { useServerInsertedHTML } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ExtendedThemeContext = createContext<ExtendedContextValue>({
    mode: "dark",
    setMode: () => {},
});

export const useExtendedTheme = () => useContext(ExtendedThemeContext);

export default function ExtendedThemeProvider({
    options,
    children,
}: ExtendedThemeProviderProps) {
    const [mode, setMode] = useState<Mode>(() =>
        getDefaultMode(localStorage.getItem("mode"))
    );
    const [systemMode, setSystemMode] = useState<PaletteMode>(() =>
        getDefaultSystemMode(localStorage.getItem("system-mode"))
    );

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;

        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };

        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };

        return { cache, flush };
    });

    const theme = useMemo(
        () => getTheme(mode === "system" ? systemMode : mode),
        [mode, systemMode]
    );

    useEffect(() => {
        const media = matchMedia("(prefers-color-scheme: dark)");
        const colorSchemeChangeListener = (e: MediaQueryListEvent) =>
            setSystemMode(e.matches ? "dark" : "light");

        media.addEventListener("change", colorSchemeChangeListener);

        return () =>
            media.removeEventListener("change", colorSchemeChangeListener);
    }, []);

    useEffect(() => localStorage.setItem("mode", mode), [mode]);

    useEffect(
        () => localStorage.setItem("system-mode", systemMode),
        [systemMode]
    );

    useServerInsertedHTML(() => {
        const names = flush();

        if (names.length === 0) {
            return null;
        }

        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }

        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <ExtendedThemeContext.Provider value={{ mode, setMode }}>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles
                        styles={css`
                            :root {
                                --toastify-color-light: ${theme.palette
                                    .grey[50]};
                                --toastify-color-dark: ${theme.palette
                                    .grey[900]};
                                --toastify-color-info: ${theme.palette.primary
                                    .main};
                                --toastify-color-success: ${theme.palette
                                    .success.main};
                                --toastify-color-warning: ${theme.palette
                                    .warning.main};
                                --toastify-color-error: ${theme.palette.error
                                    .main};
                            }
                        `}
                    />
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </ExtendedThemeContext.Provider>
    );
}
