"use client";

import { Box } from "@mui/material";

export default function RootLayoutContainer({ children }: ComponentWithChildren) {
    return (
        <Box
            sx={(theme) => ({
                overflow: "auto",
                minHeight: "100vh",
                maxHeight: "100vh",
                backgroundColor: theme.palette.background.default,
            })}
        >
            {children}
        </Box>
    );
}
