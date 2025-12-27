import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AttendanceData from "../../attendanceData.json";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function TableOfAttendance({ theclass, rows, setRows, updateStudentStatus }) {
  // const [alignment, setAlignment] = React.useState("");

  const handleChange = (gradeName, rollNo, newStatus) => {
    updateStudentStatus(gradeName, rollNo, newStatus)
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Check-in Time</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[theclass].students.map((row) => (
            <TableRow
              key={row.rollNo}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.rollNo}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.class}</TableCell>
              <TableCell align="right">
                {row.checkInTime}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  color:
                    row.status == "present"
                      ? "black"
                      : row.status == "absent"
                        ? "#d4183d"
                        : row.status == "late"
                          ? "#ca870bff"
                          : "",
                }}
              >
                {row.status}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }}
              >

                <ToggleButtonGroup
                  color="primary"
                  value={row.status}
                  exclusive
                  onChange={(e, newStatus) => {
                    if (newStatus !== null) {
                      handleChange(theclass, row.rollNo, newStatus);
                    }
                  }} aria-label="Platform"
                >
                  <ToggleButton
                    value="present"
                    style={{
                      backgroundColor:
                        row.status == "present"
                          ? "black"
                          : "white",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        color:
                          row.status == "present"
                            ? "white"
                            : "black",
                      }}
                    />
                  </ToggleButton>
                  <ToggleButton
                    value="absent"
                    style={{
                      backgroundColor:
                        row.status == "absent"
                          ? "#d4183d"
                          : "white",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        color:
                          row.status == "absent"
                            ? "white"
                            : "black",
                      }}
                    />
                  </ToggleButton>
                  <ToggleButton
                    value="late"
                    style={{
                      backgroundColor:
                        row.status == "late"
                          ? "#ccc"
                          : "white",
                      color: "black",
                    }}
                  >
                    late
                  </ToggleButton>
                </ToggleButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
