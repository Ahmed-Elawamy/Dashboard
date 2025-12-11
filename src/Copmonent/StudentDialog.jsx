import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Slide,
} from "@mui/material";
import { forwardRef } from "react";

import React from "react";
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const editFields = [
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "attendance", label: "Attendance", type: "text" },
    { key: "GPA", label: "GPA", type: "text" },
    { key: "department", label: "Department", type: "text" },
    { key: "class", label: "Class", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "status", label: "Status", type: "text" },
    { key: "birth", label: "BirthDay", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "rollNumber", label: "Roll Number", type: "text" },
    { key: "initials", label: "LOGO [AE]", type: "text" },
    { key: "id", label: "ID", type: "text" },
];
function StudentDialog({
    open,
    mode,
    onClose,
    selectedStudent,
    editStudentData,
    setEditStudentData,
    rows,
    setRows,
}) {
    function handleUpdateClose() {
        onClose();
    }
    const handleSave = () => {
        if (mode == "add") {
            const newStudent = {
                id: Date.now(),
                ...editStudentData,
            };
            setRows([...rows, newStudent]);
        } else {
            const updated = rows.map((row) => {
                return row.id === selectedStudent.id
                    ? { ...selectedStudent, ...editStudentData }
                    : row;
            });
            setRows(updated);
        }
        onClose();
    };
    return (
        <>
            {/* === Start Dialog Edit === */}
            <Dialog
                style={{ direction: "rtl" }}
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {mode == "edit" ? "Edit Student" : "Add Student"}
                </DialogTitle>

                <DialogContent>
                    {editFields.map((field) => (
                        <TextField
                            key={field.key}
                            autoFocus={field.key === "name"}
                            margin="dense"
                            id={field.key}
                            label={field.label}
                            type={field.type}
                            fullWidth
                            variant="standard"
                            value={editStudentData?.[field.key] || ""}
                            onChange={(e) =>
                                setEditStudentData((prev) => ({
                                    ...prev,
                                    [field.key]: e.target.value,
                                }))
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>Close</Button>
                    <Button onClick={handleSave}>
                        {mode == "edit" ? "Save" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* === End Dialog Edit ===  */}
        </>
    );
}
export default StudentDialog;
