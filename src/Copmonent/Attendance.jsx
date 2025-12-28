import "../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Grid, Typography, Card, Button } from "@mui/material";
import toast from "react-hot-toast";


import AttendanceData from "../../attendanceData.json";
import TableOfAttendance from "./TableOfAttendance";

function Attendance() {
    const [rows, setRows] = React.useState(AttendanceData);
    const [theclass, setTheClass] = React.useState("Grade 10-A");

    /* Collect all students from all classes */
    const getAllStudents = (rows) => {
        return Object.values(rows).flatMap((grade) => grade.students);
    };

    /* Calculate global attendance summary */
    const calculateSummary = (rows) => {
        const allStudents = getAllStudents(rows);

        const totalStudents = allStudents.length;
        const present = allStudents.filter(
            (s) => s.status === "present"
        ).length;
        const absent = allStudents.filter((s) => s.status === "absent").length;
        const late = allStudents.filter((s) => s.status === "late").length;

        const attendanceRate = totalStudents
            ? Math.round((present / totalStudents) * 100)
            : 0;

        return {
            totalStudents,
            present,
            absent,
            late,
            attendanceRate,
        };
    };

    /* Memoized summary to avoid unnecessary recalculations */
    const summary = React.useMemo(() => {
        return calculateSummary(rows);
    }, [rows]);

    /* Handle class selection */
    const handleChange = (event) => {
        setTheClass(event.target.value);
    };

    /* Update a student's attendance status */
    const updateStudentStatus = (gradeName, rollNo, newStatus) => {
        setRows((prev) => ({
            ...prev,
            [gradeName]: {
                ...prev[gradeName],
                students: prev[gradeName].students.map((student) =>
                    student.rollNo === rollNo
                        ? { ...student, status: newStatus }
                        : student
                ),
            },
        }));
    };

    /* Cards data */
    const cards = [
        {
            title: "Total Students",
            value: summary.totalStudents,
        },
        {
            title: "Present",
            value: summary.present,
        },
        {
            title: "Absent",
            value: summary.absent,
        },
        {
            title: "Attendance Rate",
            value: `${summary.attendanceRate}%`,
        },
    ];

    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Attendance
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
                Track and manage student attendance
            </Typography>

            <Container
                maxWidth="lg"
                sx={{
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                }}
            >
                {/* <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
        >
          {cards.map((v, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: { xs: 1.5, sm: 2 },
                  height: { xs: "auto", sm: 160 },
                  minHeight: { xs: 140, sm: 160 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 300, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    {v.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 300,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" }
                  }}
                >
                  {v.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid> */}

                {/* ========= Start Boxes ========== */}
                <Box
                    sx={{
                        // display: "flex",
                        // flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        // gap: "85px",
                    }}
                >
                    {cards.map((item, index) => (
                        <Grid
                            container
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            key={index}
                        >
                            <Card
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
                        </Grid>
                    ))}
                </Box>
                {/* ========= End Boxes ========== */}

                <Box
                    sx={{
                        mt: 6,
                        p: 3,
                        borderRadius: "16px",
                        background: "white",
                        border: "1px solid #00000036",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 4,
                            alignItems: "center",
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                minWidth: 180,
                                backgroundColor: "#f5f5f5",
                                borderRadius: 2,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ccc",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#000",
                                },
                                "& .MuiOutlinedInput-root": {
                                    paddingRight: 1,
                                },
                            }}
                        >
                            <InputLabel id="class-select-label">
                                Class
                            </InputLabel>
                            <Select
                                labelId="class-select-label"
                                value={theclass}
                                label="Class"
                                onChange={handleChange}
                                sx={{
                                    color: "#333",
                                    fontWeight: 500,
                                    "& .MuiSelect-icon": {
                                        color: "#000",
                                    },
                                }}
                            >
                                <MenuItem value="Grade 10-A">
                                    Grade 10-A
                                </MenuItem>
                                <MenuItem value="Grade 10-B">
                                    Grade 10-B
                                </MenuItem>
                                <MenuItem value="Grade 11-A">
                                    Grade 11-A
                                </MenuItem>
                                <MenuItem value="Grade 11-B">
                                    Grade 11-B
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            onClick={() => toast.success("Saved successfully")}
                            variant="contained"
                            sx={{
                                background: "black",
                                borderRadius: "10px",
                            }}
                        >
                            Save
                        </Button>
                    </Box>

                    <TableOfAttendance
                        theclass={theclass}
                        rows={rows}
                        setRows={setRows}
                        updateStudentStatus={updateStudentStatus}
                    />
                </Box>
            </Container>
        </>
    );
}

export default Attendance;
