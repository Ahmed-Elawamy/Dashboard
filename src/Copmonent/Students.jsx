// Students.jsx
import * as React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Components
import TableOfStudents from "./TableOfStudents.jsx";
import StudentDialog from "./StudentDialog.jsx";

import studentData from "../Data.json";

function Students({ isMobile, open }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rows, setRows] = React.useState(studentData);
    const [mode, setMode] = React.useState("add");
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [editStudentData, setEditStudentData] = React.useState({});

    const handleAdd = () => {
        setMode("add");
        setEditStudentData({});
        setSelectedStudent(null);
        setOpenDialog(true);
    };

    const handleEdit = (row) => {
        setMode("edit");
        setSelectedStudent(row);
        setEditStudentData(row);
        setOpenDialog(true);
    };

    return (
        <Container
            maxWidth={open ? (isMobile ? "sm" : "md") : isMobile ? "sm" : "lg"}
            sx={{ pt: 5 }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Students
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        Manage student information and records
                    </Typography>
                </Box>

                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    sx={{
                        background: "black",
                        color: "white",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        mt: isMobile ? 2 : 0,
                    }}
                >
                    Add Student
                </Button>
            </Box>
            <Box
                sx={{
                    borderRadius: "16px",
                    background: "white",
                    border: "1px solid #00000036",
                    p: 3,
                    // width: "100%",
                    overflowX: "auto", // دي مهمة عشان تظهر scroll أفقي بدل التمدد اللا نهائي
                }}
            >
                <Box
                    sx={{
                        maxWidth: {
                            xs: "600px", // موبايل
                            sm: "800px", // تابليت
                            md: "1042px", // كمبيوتر
                        },
                    }}
                >
                    <TableOfStudents
                        isMobile={isMobile}
                        rows={rows}
                        setRows={setRows}
                        onEdit={handleEdit}
                    />
                </Box>
            </Box>

            <StudentDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                mode={mode}
                selectedStudent={selectedStudent}
                editStudentData={editStudentData}
                setEditStudentData={setEditStudentData}
                rows={rows}
                setRows={setRows}
            />
        </Container>
    );
}

export default Students;
