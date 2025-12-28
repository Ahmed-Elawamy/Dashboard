import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Signup = () => {
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
                    Create Account
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Create a new account to access the dashboard
                </Typography>

                {/* Form */}
                <Box component="form">
                    <TextField label="Full Name" fullWidth margin="normal" />

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
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
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;
