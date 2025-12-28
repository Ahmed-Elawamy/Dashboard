import React from "react";
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Input,
    IconButton,
    InputAdornment,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import toast from "react-hot-toast";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Security() {
    /* ================= Password State ================= */
    const [passwords, setPasswords] = React.useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    /* ================= Grading System State ================= */
    const [general, setGeneral] = React.useState({
        maxGrade: 100,
        passGrade: 60,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneral((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ================= Theme ================= */
    const theme = createTheme({
        palette: {
            primary: {
                main: "#007FFF",
            },
        },
    });

    // Password Handling
    const updatePassword = () => {
        if (
            passwords.current != "" &&
            passwords.confirm != "" &&
            passwords.confirm === passwords.new
        ) {
            toast.success("Pasword was Changed successfully");
        } else if (
            passwords.current === "" ||
            passwords.confirm === "" ||
            passwords.new === ""
        ) {
            toast.error("Some Input Is Empty");
        } else if (passwords.confirm !== passwords.new) {
            toast.error(
                "New Password Input Not Eqal To Confirm Password Input"
            );
        } else {
            toast.error("Invalid Inputs, Please Try Again");
        }
    };
    return (
        <ThemeProvider theme={theme}>
            {/* ================= Password Section ================= */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    mb: 4,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Password
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Change your account password
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Current Password</InputLabel>
                            <Input
                                name="current"
                                type={showPassword ? "text" : "password"}
                                value={passwords.current}
                                onChange={handlePasswordChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>New Password</InputLabel>
                            <Input
                                name="new"
                                type={showPassword ? "text" : "password"}
                                value={passwords.new}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Confirm Password</InputLabel>
                            <Input
                                name="confirm"
                                type={showPassword ? "text" : "password"}
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Box
                    sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}
                >
                    <Button
                        onClick={() => updatePassword()} // toast.success("Saved successfully")
                        variant="contained"
                        size="large"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Update Password
                    </Button>
                </Box>
            </Paper>

            {/* ================= Grading System ================= */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Grading System
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Configure grading scales and pass marks
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Maximum Grade"
                            type="number"
                            name="maxGrade"
                            value={general.maxGrade}
                            onChange={handleChange}
                            inputProps={{
                                min: 0,
                                max: 100,
                                step: 1,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Passing Grade (%)"
                            type="number"
                            name="passGrade"
                            value={general.passGrade}
                            onChange={handleChange}
                            inputProps={{
                                min: 0,
                                max: 100,
                                step: 1,
                            }}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}
                >
                    <Button
                        onClick={() => toast.success("Saved successfully")}
                        variant="contained"
                        size="large"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </ThemeProvider>
    );
}

export default Security;
