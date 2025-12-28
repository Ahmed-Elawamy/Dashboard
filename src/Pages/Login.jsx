import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async () => {
        setLoading(true);

        axios
            .post(
                "/api/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                console.log("Success", res.data);
            })
            .catch((err) => {
                console.log(
                    "Err",
                    err.response ? err.response.data : err.message
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: { xs: "90%", sm: 420 },
                    p: 4,
                    borderRadius: 3,
                }}
            >
                {/* Title */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    mb={1}
                >
                    Login
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Welcome back to the dashboard
                </Typography>

                {/* Form */}
                <Box component="form">
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 3,
                            py: 1.2,
                            borderRadius: 2,
                        }}
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
