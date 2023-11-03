import RootLayoutContainer from "@/components/RootLayoutContainer";
import ExtendedThemeProvider from "@/context/ExtendedThemeProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import "@fontsource/roboto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ExtendedThemeProvider options={{ key: "css" }}>
                    <ReactQueryProvider>
                        <RootLayoutContainer>{children}</RootLayoutContainer>
                        <ToastContainer draggable theme="colored" />
                    </ReactQueryProvider>
                </ExtendedThemeProvider>
            </body>
        </html>
    );
}
