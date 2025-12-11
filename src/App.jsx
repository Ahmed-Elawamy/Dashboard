import "./App.css";
import Sidebar from "./pages/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Copmonent/Dashboard";
import Students from "./Copmonent/Students";
import Courses from "./Copmonent/Courses";
import Attendance from "./Copmonent/Attendance";
import Grades from "./Copmonent/Grades";
import Teachers from "./Copmonent/Teachers";
import Finance from "./Copmonent/Finance";
import Settings from "./Copmonent/Settings";
import ErrorPage from "./Pages/ErrorPage";
import { Box } from "@mui/material";

function App() {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Sidebar /> {/* سايدبار */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        transition: "margin 0.3s",
                        height: "100vh"
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/grades" element={<Grades />} />
                        <Route path="/techers" element={<Teachers />} />
                        <Route path="/finance" element={<Finance />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default App;
