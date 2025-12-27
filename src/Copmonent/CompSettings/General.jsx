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
    MenuItem,
    Select,
    createTheme,
    ThemeProvider,
} from "@mui/material";

function General() {
    const [general, setGeneral] = React.useState({
        schoolName: "EduManage High School",
        schoolCode: "EMHS001",
        email: "info@edumanage.com",
        phone: "+1-234-567-8900",
        address: "123 Education Street, City, State 12345",
    });

    const [timeZone, setTimeZone] = React.useState("EST");
    const [dateFormat, setDateFormat] = React.useState("MM/DD/YYYY");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneral((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#007FFF",
                dark: "#0066CC",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {/* School Info Form */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    backgroundColor: "background.paper",
                    mb: 4,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    School Information
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Update your school&apos;s basic information
                </Typography>

                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>School Name</p>

                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            name="schoolName"
                            value={general.schoolName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>School Code</p>

                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            name="schoolCode"
                            value={general.schoolCode}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>Contact Email</p>
                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            type="email"
                            name="email"
                            value={general.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>Contact Phone</p>

                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            name="phone"
                            value={general.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>Address</p>

                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            name="address"
                            value={general.address}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>

            {/* System Preferences */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    System Preferences
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Configure system-wide settings
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ width: "50%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="timezone-label">
                                Time Zone
                            </InputLabel>
                            <Select
                                labelId="timezone-label"
                                id="timezone-select"
                                value={timeZone}
                                label="Time Zone"
                                onChange={(e) => setTimeZone(e.target.value)}
                            >
                                <MenuItem value={"EST"}>
                                    Eastern Standard Time (EST)
                                </MenuItem>
                                <MenuItem value={"CST"}>
                                    Central Standard Time (CST)
                                </MenuItem>
                                <MenuItem value={"PST"}>
                                    Pacific Standard Time (PST)
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ width: "40%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="dateformat-label">
                                Date Format
                            </InputLabel>
                            <Select
                                labelId="dateformat-label"
                                id="dateformat-select"
                                value={dateFormat}
                                label="Date Format"
                                onChange={(e) => setDateFormat(e.target.value)}
                            >
                                <MenuItem value={"MM/DD/YYYY"}>
                                    MM/DD/YYYY
                                </MenuItem>
                                <MenuItem value={"DD/MM/YYYY"}>
                                    DD/MM/YYYY
                                </MenuItem>
                                <MenuItem value={"YYYY-MM-DD"}>
                                    YYYY-MM-DD
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
}

export default General;
