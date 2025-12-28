import "../App.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import * as React from "react";
import { Container, Grid, Typography, Card, Box, Button } from "@mui/material";

import TeacherData from "../../teachersData.json";
import TableOfTeachers from "./TableOfTeachers.jsx";

function Teachers({ isMobile }) {
    const [rows, setRows] = React.useState(TeacherData);

    // State للتحكم في modal Add / Edit
    const [openModal, setOpenModal] = React.useState(false);
    const [mode, setMode] = React.useState("add"); // add | edit
    const [selectedTeacher, setSelectedTeacher] = React.useState(null);
    const [dialogForm, setDialogForm] = React.useState(false);

    const handleAddTeacher = () => {
        setMode("add");
        setSelectedTeacher(null);
        setOpenModal(true);
    };

    const cards = [
        {
            title: "Total Teachers",
            value: `${rows.metadata.totalTeachers}`,
        },
        {
            title: "Active",
            value: `${rows.metadata.activeTeachers}`,
        },
        {
            title: "Total Courses",
            value: `${rows.metadata.totalCourses}`,
        },
        {
            title: "Avg. Experience",
            value: `${rows.metadata.averageExperience} years`,
        },
    ];

    return (
        <>
            <Container
                maxWidth="lg"
                sx={{
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0px 50px 0",
                    }}
                >
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            Teachers
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 300 }}>
                            Manage teaching staff and their assignments
                        </Typography>
                    </div>
                </div>

                {/* ========= Start Boxes ========== */}
                <Container maxWidth="lg">
                    <Grid
                        container
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        sx={{ gap: 4 }}
                    >
                        {cards.map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    flex: "1 1 214px",
                                    // maxWidth: 260,
                                    height: 176,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 4,
                                    border: "1px solid #e0e0e0",
                                    p: 2,
                                    textAlign: "center",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                }}
                            >
                                {item.icon}
                                <Typography
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "1rem",
                                        mt: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 300,
                                        mt: 0.5,
                                        color: "#007fff",
                                    }}
                                >
                                    {item.value}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        color: "gray",
                                        mt: 0.5,
                                    }}
                                >
                                    {item.change}
                                </Typography>
                            </Card>
                        ))}
                    </Grid>
                    {/* </Box> */}
                </Container>
                {/* ========= End Boxes ========== */}

                {/* ============ */}
                <Box
                    sx={{
                        marginTop: "43px",
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
                                md: "1105px", // كمبيوتر
                            },
                        }}
                    >
                        <TableOfTeachers
                            isMobile={isMobile}
                            rows={rows}
                            setRows={setRows}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            mode={mode}
                            setMode={setMode}
                            selectedTeacher={selectedTeacher}
                            setSelectedTeacher={setSelectedTeacher}
                        />
                    </Box>
                </Box>
                {/* ============ */}

                {/* <Box
                    sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: "16px",
                        background: "white",
                        border: "1px solid #00000036",
                        width: isMobile ? "74%" : "100%",
                    }}
                >
                    <TableOfTeachers
                        isMobile={isMobile}
                        rows={rows}
                        setRows={setRows}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        mode={mode}
                        setMode={setMode}
                        selectedTeacher={selectedTeacher}
                        setSelectedTeacher={setSelectedTeacher}
                    />
                </Box> */}
            </Container>
        </>
    );
}

export default Teachers;
