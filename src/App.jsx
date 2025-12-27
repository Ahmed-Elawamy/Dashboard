import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Pages/Sidebar.jsx";
import Dashboard from "./Copmonent/Dashboard";
import Students from "./Copmonent/Students";
import Courses from "./Copmonent/Courses";
import Attendance from "./Copmonent/Attendance";
import Grades from "./Copmonent/Grades";
import Teachers from "./Copmonent/Teachers";
import Finance from "./Copmonent/Finance";
import Settings from "./Copmonent/Settings";
import ErrorPage from "./Pages/ErrorPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DRAWER_OPEN = 300;
const DRAWER_CLOSED = 100;

function App() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                // width: "100vh",
            }}
        >
            <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: open ? `${DRAWER_OPEN}px` : `${DRAWER_CLOSED}px`,
                    // ml: "100px",
                    p: { xs: 2, sm: 3 },
                    transition: (theme) =>
                        theme.transitions.create("margin", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.standard,
                        }),
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/students"
                        element={<Students isMobile={isMobile} open={open} />}
                    />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/grades" element={<Grades />} />
                    <Route
                        path="/techers"
                        element={<Teachers isMobile={isMobile} />}
                    />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/settings" element={<Settings />} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
