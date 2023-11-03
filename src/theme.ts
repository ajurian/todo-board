import Link from "@/components/mui/Link";
import { PaletteMode, createTheme } from "@mui/material";

const makeTheme = (paletteMode: PaletteMode) => {
    const theme = createTheme({
        spacing: (factor: number) => `${factor * 0.25}rem`,
        palette: {
            mode: paletteMode,
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: Link,
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: Link,
                },
            },
        },
    });

    if (paletteMode === "light") {
        theme.palette.background.default = "#f5f5f5";
        theme.typography.h1.color = theme.palette.grey[900];
        theme.typography.h2.color = theme.palette.grey[900];
        theme.typography.h3.color = theme.palette.grey[900];
        theme.typography.h4.color = theme.palette.grey[800];
        theme.typography.h5.color = theme.palette.grey[800];
        theme.typography.h6.color = theme.palette.grey[800];
        theme.typography.body1.color = theme.palette.grey[800];
        theme.typography.body2.color = theme.palette.grey[700];
        theme.typography.subtitle1.color = theme.palette.grey[700];
        theme.typography.subtitle2.color = theme.palette.grey[700];
        theme.typography.caption.color = theme.palette.grey[600];
    } else {
        theme.typography.h1.color = theme.palette.grey[50];
        theme.typography.h2.color = theme.palette.grey[50];
        theme.typography.h3.color = theme.palette.grey[50];
        theme.typography.h4.color = theme.palette.grey[100];
        theme.typography.h5.color = theme.palette.grey[100];
        theme.typography.h6.color = theme.palette.grey[100];
        theme.typography.body2.color = theme.palette.grey[200];
        theme.typography.subtitle1.color = theme.palette.grey[200];
        theme.typography.subtitle2.color = theme.palette.grey[200];
        theme.typography.caption.color = theme.palette.grey[300];
    }

    return theme;
};

export const lightTheme = makeTheme("light");
export const darkTheme = makeTheme("dark");
export const getTheme = (paletteMode: PaletteMode) =>
    paletteMode === "light" ? lightTheme : darkTheme;
