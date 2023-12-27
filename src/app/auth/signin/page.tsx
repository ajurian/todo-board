"use client";

import useAuth from "@/hooks/useAuth";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { FormEventHandler, useCallback, useState } from "react";

export default function SigninPage() {
    const { signInWithPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        async (e) => {
            e.preventDefault();
            signInWithPassword(email, password);
        },
        [signInWithPassword, email, password]
    );

    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Paper
                sx={(theme) => ({
                    minWidth: theme.spacing(80),
                    display: "flex",
                    flexDirection: "column",
                    gap: 4.5,
                    p: 4.5,
                })}
                elevation={2}
            >
                <Typography variant="h6" textAlign="center">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        size="small"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        size="small"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <Button type="submit" variant="contained">
                        Sign in
                    </Button>
                </Box>
                <Typography variant="body2" textAlign="center">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup">Sign up</Link>
                </Typography>
            </Paper>
        </Box>
    );
}
