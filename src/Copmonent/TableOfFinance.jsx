import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function TableOfFinance({ rows, setRows }) {
    const [openView, setOpenView] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    // ===== View =====
    const handleView = (student) => {
        setSelectedStudent(student);
        setOpenView(true);
    };

    // ===== Collect =====
    const handleCollect = (rollNo) => {
        setRows((prev) => ({
            ...prev,
            students: prev.students.map((student) =>
                student.rollNo === rollNo
                    ? {
                          ...student,
                          paid: student.totalFee,
                          pending: 0,
                          status: "Paid",
                          lastPayment: new Date().toISOString().split("T")[0],
                      }
                    : student
            ),
        }));
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{ padding: "50px 3px", borderRadius: "21px" }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Roll No</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Total Fee</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">Pending</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Last Payment</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.students.map((row) => (
                            <TableRow key={row.rollNo}>
                                <TableCell>{row.rollNo}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">{row.class}</TableCell>
                                <TableCell align="right">
                                    ${row.totalFee}
                                </TableCell>
                                <TableCell align="right">${row.paid}</TableCell>
                                <TableCell align="right">
                                    ${row.pending}
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: "bold",
                                        color:
                                            row.status === "Paid"
                                                ? "green"
                                                : row.status === "Pending"
                                                ? "#d4183d"
                                                : "#ca870b",
                                    }}
                                >
                                    {row.status}
                                </TableCell>

                                <TableCell align="right">
                                    {row.lastPayment || "-"}
                                </TableCell>

                                <TableCell align="center">
                                    <Button
                                        sx={{
                                            color: "black",
                                            border: "1px solid #e5e5e5",
                                            borderRadius: "11px",
                                        }}
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleView(row)}
                                    >
                                        View
                                    </Button>

                                    {(row.status === "Pending" ||
                                        row.status === "Partial") && (
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{
                                                ml: 1,
                                                background: "#030213",
                                                borderRadius: "11px",
                                                padding: "3px 9px",
                                            }}
                                            onClick={() =>
                                                handleCollect(row.rollNo)
                                            }
                                        >
                                            Collect
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ===== View Dialog ===== */}
            <Dialog open={openView} onClose={() => setOpenView(false)}>
                <DialogTitle>Student Details</DialogTitle>

                <DialogContent>
                    {selectedStudent && (
                        <>
                            <p>
                                <strong>Name:</strong> {selectedStudent.name}
                            </p>
                            <p>
                                <strong>Class:</strong> {selectedStudent.class}
                            </p>
                            <p>
                                <strong>Total Fee:</strong> $
                                {selectedStudent.totalFee}
                            </p>
                            <p>
                                <strong>Paid:</strong> ${selectedStudent.paid}
                            </p>
                            <p>
                                <strong>Pending:</strong> $
                                {selectedStudent.pending}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {selectedStudent.status}
                            </p>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenView(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
