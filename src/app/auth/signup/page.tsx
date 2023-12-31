"use client";

import useAuth from "@/hooks/useAuth";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { FormEventHandler, useState } from "react";

export default function SignupPage() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const error = await signUp(email, password);
        setErrorMessage(error ? error.message : "");
    };

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
                    Sign up
                </Typography>
                {errorMessage.length > 0 && (
                    <Typography
                        variant="body2"
                        color="error"
                        textAlign="center"
                    >
                        {errorMessage}
                    </Typography>
                )}
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
                        Sign up
                    </Button>
                </Box>
                <Typography variant="body2" textAlign="center">
                    Already have an account?{" "}
                    <Link href="/auth/signin">Sign in</Link>
                </Typography>
            </Paper>
        </Box>
    );
}
