import "../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Grid, Typography, Card } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import gradesData from "../../gradesData.json";
import TableOfGrades from "./TableOfGrades.jsx";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f3f3f5",
  transition: "0.5s",
  position: "relative",
  padding: "8px 4px",
  display: "flex",
  alignItems: "center",
  "&:hover": { backgroundColor: "#fff" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

function Grades() {
  const [rows] = React.useState(gradesData);
  const [theclass, setTheClass] = React.useState("Grade 10-A");
  const [theSemster, setTheSemster] = React.useState("Semester 1");
  const [searchText, setSearchText] = React.useState("");

  const students =
    rows.classes?.[theclass]?.[theSemster]?.students || [];

  const filteredStudents = React.useMemo(() => {
    const searchLower = searchText.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchLower) ||
        s.rollNo.toLowerCase().includes(searchLower)
    );
  }, [searchText, students]);

  const stats = React.useMemo(() => {
    if (!students.length) return null;

    const averages = students.map((s) => s.average);
    const classAverage =
      (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(1);

    const highestStudent = students.reduce((max, s) =>
      s.average > max.average ? s : max
    );

    const aPlusCount = students.filter((s) => s.grade === "A+").length;
    const passRate = 100;

    return {
      classAverage,
      highestStudent,
      aPlusCount,
      passRate,
      total: students.length,
    };
  }, [students]);

  const cards = stats
    ? [
      { title: "Class Average", value: `${stats.classAverage}%` },
      {
        title: "A+ Grade",
        value: `${stats.aPlusCount} Students (${Math.round(
          (stats.aPlusCount / stats.total) * 100
        )}%)`,
      },
      {
        title: "Highest Score",
        value: `${stats.highestStudent.average}% - ${stats.highestStudent.name}`,
      },
      { title: "Pass Rate", value: `${stats.passRate}%` },
    ]
    : [];

  return (
      <>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Grades
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
              Examinations - Manage student grades and examination results
          </Typography>

          <Container
              maxWidth="lg"
              sx={{ pt: { xs: 2, sm: 3, md: 5 }, px: { xs: 1, sm: 2, md: 3 } }}
          >
              {/* <Grid container spacing={{ xs: 2, sm: 3 }}>
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
                                  <Typography
                                      sx={{
                                          fontWeight: 300,
                                          fontSize: {
                                              xs: "0.875rem",
                                              sm: "1rem",
                                          },
                                      }}
                                  >
                                      {v.title}
                                  </Typography>
                              </Box>
                              <Typography
                                  variant="h5"
                                  sx={{
                                      fontWeight: 300,
                                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                                  }}
                              >
                                  {v.value}
                              </Typography>
                          </Card>
                      </Grid>
                  ))}
              </Grid> */}

              {/* ============= Start Boxes ============== */}
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
                      <Grid container xs={12} sm={12} md={3} lg={3} key={index}>
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
              {/* ============= End Boxes ============== */}

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
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 4,
                          alignItems: "center",
                      }}
                  >
                      <FormControl sx={{ minWidth: 180 }}>
                          <InputLabel>Class</InputLabel>
                          <Select
                              value={theclass}
                              label="Class"
                              onChange={(e) => setTheClass(e.target.value)}
                          >
                              {Object.keys(rows.classes).map((cls) => (
                                  <MenuItem key={cls} value={cls}>
                                      {cls}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <FormControl sx={{ minWidth: 180 }}>
                          <InputLabel>Semester</InputLabel>
                          <Select
                              value={theSemster}
                              label="Semester"
                              onChange={(e) => setTheSemster(e.target.value)}
                          >
                              <MenuItem value="Semester 1">Semester 1</MenuItem>
                              <MenuItem value="Semester 2">Semester 2</MenuItem>
                              <MenuItem value="Final Exam">Final Exam</MenuItem>
                          </Select>
                      </FormControl>

                      <Search sx={{ flexGrow: 1, maxWidth: 300 }}>
                          <SearchIconWrapper>
                              <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                              placeholder="Name or Roll No…"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                          />
                      </Search>
                  </Box>

                  <TableOfGrades
                      students={filteredStudents}
                      theclass={theclass}
                      theSemster={theSemster}
                  />
              </Box>
          </Container>
      </>
  );
}

export default Grades;
