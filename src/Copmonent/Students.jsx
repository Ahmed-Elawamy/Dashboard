import * as React from "react";
import { Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";

// Component
import TableOfStudents from "./TableOfStudents.jsx";
import StudentDialog from "./StudentDialog.jsx";

import studentData from "../Data.json";

function Students() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rows, setRows] = React.useState(studentData);
    const [mode, setMode] = React.useState("add"); // add | edit
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [editStudentData, setEditStudentData] = React.useState({
    });
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
        <Container maxWidth="lg" sx={{ pt: 5 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    margin: "25px 0",
                }}
            >
                <div>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "left", fontWeight: "600" }}
                    >
                        Students
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: "left", fontWeight: "300" }}
                    >
                        Manage student information and records
                    </Typography>
                </div>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    sx={{
                        background: "black",
                        color: "white",
                        padding: "10px 14px",
                        borderRadius: "10px",
                    }}
                >
                    Add Student
                </Button>
            </div>
            <Box
                component="section"
                sx={{
                    p: 30,
                    borderRadius: "16px",
                    background: "white",
                    border: "1px solid #00000036",
                    position: "relative",
                    padding: "30px",
                }}
            >
                <TableOfStudents
                    rows={rows}
                    setRows={setRows}
                    onEdit={handleEdit}
                    setEditStudentData={setEditStudentData}
                    setSelectedStudent={setSelectedStudent}
                />
            </Box>
            <StudentDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                }}
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
