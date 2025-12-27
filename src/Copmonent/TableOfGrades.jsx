import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableOfGrades({ students }) {
  const getGradeColor = (value) => {
    if (value >= 90) return "#5aa682";
    if (value >= 50) return "#3b96fd";
    return "#000";
  };

  const getBadgeStyle = (grade) => ({
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: ["A+", "A", "B+"].includes(grade) ? "#fff" : "#000",
    background: ["A+", "A", "B+"].includes(grade)
      ? "#021302"
      : "#eceef2",
  });

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table size="small" aria-label="grades table">
        <TableHead>
          <TableRow sx={{ background: "#f7f7f9" }}>
            <TableCell>Roll No</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Mathematics</TableCell>
            <TableCell align="right">Science</TableCell>
            <TableCell align="right">English</TableCell>
            <TableCell align="right">History</TableCell>
            <TableCell align="right">Average</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((row) => (
            <TableRow
              key={row.rollNo}
              sx={{
                "&:hover": { backgroundColor: "#fafafa" },
                "&:last-child td": { borderBottom: 0 },
              }}
            >
              <TableCell>{row.rollNo}</TableCell>
              <TableCell>{row.name}</TableCell>

              <TableCell
                align="right"
                sx={{ color: getGradeColor(row.grades.Mathematics) }}
              >
                {row.grades.Mathematics}%
              </TableCell>

              <TableCell
                align="right"
                sx={{ color: getGradeColor(row.grades.Science) }}
              >
                {row.grades.Science}%
              </TableCell>

              <TableCell
                align="right"
                sx={{ color: getGradeColor(row.grades.English) }}
              >
                {row.grades.English}%
              </TableCell>

              <TableCell
                align="right"
                sx={{ color: getGradeColor(row.grades.History) }}
              >
                {row.grades.History}%
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  color: getGradeColor(row.average),
                }}
              >
                {row.average}%
              </TableCell>

              <TableCell align="right">
                <span style={getBadgeStyle(row.grade)}>
                  {row.grade}
                </span>
              </TableCell>
            </TableRow>
          ))}

          {!students.length && (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
