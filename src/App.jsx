import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";
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
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";

const DRAWER_OPEN = 240; // خليه أصغر شوية للموبايل
const DRAWER_CLOSED = 60; // خليه minimal

function App() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // لو موبايل خليها column
                minHeight: "100vh",
            }}
        >
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontSize: "14px",
                    },
                }}
            />
            <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: isMobile
                        ? 0
                        : open
                        ? `${DRAWER_OPEN}px`
                        : `${DRAWER_CLOSED}px`, // إزالة الهامش على الموبايل
                    mt: isMobile ? `${DRAWER_CLOSED}px` : 0, // لو تحب تحط مساحة فوق للـ Sidebar على الموبايل
                    p: { xs: 2, sm: 3 },
                    transition: theme.transitions.create(["margin", "width"], {
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
                    <Route
                        path="/dashboard"
                        element={<Dashboard isMobile={isMobile} />}
                    />
                    <Route
                        path="/students"
                        element={<Students isMobile={isMobile} open={open} />}
                    />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/grades" element={<Grades />} />
                    <Route
                        path="/teachers"
                        element={<Teachers isMobile={isMobile} />}
                    />
                    <Route
                        path="/finance"
                        element={<Finance isMobile={isMobile} />}
                    />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
