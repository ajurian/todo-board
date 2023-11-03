"use client";

import AvatarMenu from "@/components/Header/AvatarMenu";
import { Icons, NextMode } from "@/components/Header/HeaderProps";
import { useExtendedTheme } from "@/context/ExtendedThemeProvider";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";

const icons: Icons = {
    light: LightMode,
    dark: DarkMode,
    system: SettingsBrightness,
};

const nextMode: NextMode = {
    light: "dark",
    dark: "system",
    system: "light",
};

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { mode, setMode } = useExtendedTheme();
    const Icon = icons[mode];

    const handleClick = () => setMode(nextMode[mode]);

    return (
        <Paper
            component="header"
            sx={(theme) => ({
                borderRadius: 0,
                px: 6,
                py: 3,
                display: "flex",
                justifyContent: "space-between",
                position: "sticky",
                left: 0,
                top: 0,
                width: "100%",
                zIndex: theme.zIndex.appBar,
            })}
        >
            <Box
                component="nav"
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
            >
                <Typography variant="h6">Todo Board</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <IconButton size="small" onClick={handleClick}>
                    <Icon fontSize="small" />
                </IconButton>
                <Avatar
                    sx={(theme) => ({
                        width: theme.spacing(8),
                        height: theme.spacing(8),
                        cursor: "pointer",
                    })}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                />
                <AvatarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </Box>
        </Paper>
    );
}
