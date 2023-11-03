import type { Options } from "@emotion/cache";
import type { PaletteMode } from "@mui/material";

type Mode = PaletteMode | "system";

interface ExtendedContextValue {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

interface ExtendedThemeProviderProps extends ComponentWithChildren {
    options: Options;
}
