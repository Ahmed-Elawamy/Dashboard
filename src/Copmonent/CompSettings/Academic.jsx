import React from "react";
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Paper,
    FormControl,
    MenuItem,
    Select,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import toast from "react-hot-toast";

function Academic() {
    const [general, setGeneral] = React.useState({
        cuurentYear: "2024-2025",
        maxGrade: "100",
        passGrade: "60",
    });
    const [semster, setSemster] = React.useState("Fall Semester");

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
                    Academic Year
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Configure academic year and semester settings
                </Typography>

                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <p style={{ width: "100%: " }}>Current Academic Year</p>
                        <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            name="cuurentYear"
                            value={general.cuurentYear}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <p style={{ width: "100%: " }}>Current Academic Year</p>
                        <FormControl fullWidth>
                            <Select
                                labelId="semster-label"
                                id="semster-select"
                                value={semster}
                                label="semster"
                                onChange={(e) => setSemster(e.target.value)}
                            >
                                <MenuItem value={"Fall Semester"}>
                                    Fall Semester
                                </MenuItem>
                                <MenuItem value={"Spring Semester"}>
                                    Spring Semester
                                </MenuItem>
                                <MenuItem value={"Summer Semester"}>
                                    Summer Semester
                                </MenuItem>
                            </Select>
                        </FormControl>
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
                        onClick={() => toast.success("Saved successfully")}
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

            {/* Grading System*/}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Grading System
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Configure grading scales and pass marks
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ width: "50%" }}>
                        <TextField
                            fullWidth
                            label="Maximum Grade"
                            variant="outlined"
                            name="maxGrade"
                            value={general.maxGrade}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ width: "45%" }}>
                        <TextField
                            fullWidth
                            label="Passing Grade (%)"
                            variant="outlined"
                            name="passGrade"
                            value={general.passGrade}
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
        </ThemeProvider>
    );
}

export default Academic;
