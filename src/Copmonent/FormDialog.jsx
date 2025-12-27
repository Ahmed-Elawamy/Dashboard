import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";


export default function FormDialog({ dialogForm, setDialogForm, infoCourses, setInfoCourses, setCoursesData, coursesData, editStudentData, setEditStudentData, mode }) {

    const handleClose = () => {
        // setOpen(false);
        setDialogForm(false);
        setInfoCourses("")
        setEditStudentData("")
    };
    const handleAddCourse = () => {
        if (mode == "add") {
            setCoursesData([...coursesData, { ...infoCourses }])
            setInfoCourses("")
        } else if (mode == "edit") {
            const updated = coursesData.map((c) => {
                return c.id === editStudentData.id ? { c, ...editStudentData } : c
            })
            setCoursesData(updated)
            setInfoCourses("")
            setEditStudentData("")
        }
        // setDialogForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog open={dialogForm} onClose={handleClose}>
                <DialogTitle>{mode == "add" ? "Add New Course" : "Edit Course"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="add-course">
                        <Box sx={{ display: 'flex', flexWrap: "wrap", gap: "20px" }}>

                            <TextField
                                id="filled-basic" label="Course Name" variant="filled" value={mode == "edit" ? editStudentData?.name : infoCourses.name} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, name: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, name: e.target.value }) }}
                            />
                            <TextField
                                id="filled-basic" label="Phone" variant="filled" value={editStudentData.phone || infoCourses.phone} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, phone: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, phone: e.target.value }) }}
                            />
                            <TextField
                                id="filled-basic" label="Course Code" variant="filled"
                                value={mode == "edit" ? editStudentData?.id : infoCourses.id} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, id: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, id: e.target.value }) }}
                            />
                            {/* Select Department */}
                            <FormControl sx={{ width: "35%" }}>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                    labelId="Select Department"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={mode == "edit" ? editStudentData?.department : infoCourses.department} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, department: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, department: e.target.value }) }}
                                >
                                    <MenuItem value="Science">Science</MenuItem>
                                    <MenuItem value="Arts">Arts</MenuItem>
                                    <MenuItem value="Programming">Programming</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: "35%" }}>
                                <InputLabel id="demo-simple-select-label">Assign Teacher</InputLabel>
                                <Select
                                    labelId="Select Teacher"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={mode == "edit" ? editStudentData?.teacher : infoCourses.teacher} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, teacher: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, teacher: e.target.value }) }}
                                >
                                    <MenuItem value="Prof. James Wilson">Prof. James Wilson</MenuItem>
                                    <MenuItem value="Dr. Sarah Anderson">Dr. Sarah Anderson</MenuItem>
                                    <MenuItem value="Dr. Robert Smith">Dr. Robert Smith</MenuItem>
                                    <MenuItem value="Prof. Emily Johnson">Prof. Emily Johnson</MenuItem>
                                    <MenuItem value="Dr. Michael Chen">Dr. Michael Chen</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: "35%" }}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="Select Teacher"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={mode == "edit" ? editStudentData?.status : infoCourses.status} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, status: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, status: e.target.value }) }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Copmleted">Copmleted</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="filled-basic" label="Duration" variant="filled"
                                value={mode == "edit" ? editStudentData?.duration_weeks : infoCourses.duration_weeks} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, duration_weeks: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, duration_weeks: e.target.value }) }}
                            />

                            <TextField
                                id="filled-basic" label="Max Student" variant="filled"
                                value={mode == "edit" ? editStudentData?.students_enrolled : infoCourses.students_enrolled} onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, students_enrolled: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, students_enrolled: e.target.value }) }}
                            />


                            <TextField
                                id="filled-multiline-static"
                                label="Multiline"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                variant="filled"
                                value={mode == "edit" ? editStudentData?.description : infoCourses.description}
                                onChange={mode == "edit" ? (e) => { setEditStudentData({ ...editStudentData, description: e.target.value }) } : (e) => { setInfoCourses({ ...infoCourses, description: e.target.value }) }}
                            />
                        </Box>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="add-course" onClick={handleAddCourse}>
                        {mode == "add" ? "Add" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
