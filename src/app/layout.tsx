import RootLayoutContainer from "@/components/RootLayoutContainer";
import ExtendedThemeProvider from "@/context/ExtendedThemeProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import "@fontsource/roboto";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
    title: "Todo Board",
};

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
