import ExtendedThemeProvider from "@/context/ExtendedThemeProvider/ExtendedThemeProvider";
import dynamic from "next/dynamic";

export { useExtendedTheme } from "./ExtendedThemeProvider";

// it doesn't make sense doing ssr in this provider
export default dynamic(() => Promise.resolve(ExtendedThemeProvider), {
    ssr: false,
});
