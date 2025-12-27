import * as React from "react";
import { forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    styled,
    Box,
    Modal,
    Backdrop,
    Fade,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Slide,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
    Search as SearchIcon,
    VisibilityOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";

// ================ START Constants & Styles ================
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Search = styled("div")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f3f3f5",
    transition: "0.5s",
    position: "absolute",
    top: "21px",
    left: "7px",
    padding: "8px 4px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:hover": {
        backgroundColor: "#e3e3f0ff",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "95%",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));


// ================ END Constants & Styles ================

export default function TableOfStudents({ rows, setRows, onEdit, isMobile }) {
    const [searchText, setSearchText] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    // Handler for closing modal
    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
    };

    // Handler for showing student details
    const showStd = React.useCallback((row) => {
        // Prepare the data in the format that the modal expects
        const modalData = {
            name: row.name || "",
            email: row.email || "",
            rollNumber: row.rollNo || "",
            phone: row.phone || "",
            birth: row.dateOfBirth || "",
            status: row.status || "",
            address: row.address || "",
            class: row.class || "",
            department: row.department || "",
            GPA: row.gpa || "",
            attendance: row.attendanceRate || "",
            // Add other fields if needed
        };

        setSelectedStudent(modalData);
        setOpen(true);
    }, []);

    // Handler for deleting student
    const deleteStd = React.useCallback(
        (row) => {
            if (
                window.confirm(`Are you sure you want to delete ${row.name}?`)
            ) {
                const filteredStd = rows.filter((r) => r.id !== row.id);
                setRows(filteredStd);
            }
        },
        [rows, setRows]
    );

    // Columns definition
    const columns = React.useMemo(
        () => [
            {
                field: "initials",
                headerName: "Student",
                width: 70,
                renderCell: (params) => (
                    <div
                        style={{
                            borderRadius: "50%",
                            textAlign: "center",
                            width: "46px",
                            background: "#ececf0",
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "42px",
                            margin: "3px 0",
                        }}
                    >
                        {params.row.initials}
                    </div>
                ),
            },
            { field: "name", headerName: "Name", width: 170 },
            { field: "email", headerName: "Email", width: 180 },
            { field: "rollNo", headerName: "Roll No", width: 120 },
            { field: "class", headerName: "Class", width: 130 },
            { field: "department", headerName: "Department", width: 130 },
            {
                field: "status",
                headerName: "Status",
                width: 150,
                renderCell: (params) => {
                    const status = params.row.status;
                    return (
                        <div
                            style={{
                                background:
                                    status === "Active" ? "#030213" : "#f2edee",
                                color: status === "Active" ? "white" : "black",
                                borderRadius: "7px",
                                fontSize: "17px",
                                width: "53%",
                                height: "74%",
                                margin: "6px 37px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {status}
                        </div>
                    );
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 120,
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                    const row = params.row;
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "15px",
                                marginTop: "10px",
                                flexWrap: "nowrap",
                                flexDirection: "row",
                            }}
                        >
                            <EditOutlined
                                onClick={() => onEdit(row)}
                                style={{
                                    color: "#7a7a7aff",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                title="Edit"
                            />
                            <VisibilityOutlined
                                onClick={() => showStd(row)}
                                style={{
                                    color: "#7a7a7aff",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                title="View Details"
                            />
                            <DeleteOutlined
                                onClick={() => deleteStd(row)}
                                style={{
                                    color: "#f70c3bff",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                title="Delete"
                            />
                        </div>
                    );
                },
            },
        ],
        [onEdit, showStd, deleteStd]
    );

    // Filter rows based on search text
    const filteredRows = React.useMemo(() => {
        const searchLower = searchText.toLowerCase();
        return rows.filter((row) => {
            return (
                row.name.toLowerCase().includes(searchLower) ||
                row.email.toLowerCase().includes(searchLower) ||
                row.rollNo.toLowerCase().includes(searchLower)
            );
        });
    }, [rows, searchText]);

    return (
        <div
            style={{
                height: 400,
                width: "100%",
                marginTop: "50px",
            }}
        >
            <DataGrid rows={filteredRows} columns={columns} />

            <Search
                sx={{
                    width:"100%",
                }}
            >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Search>

            {/* Modal for showing student information */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ mb: 2 }}
                        >
                            Student Information
                        </Typography>

                        {selectedStudent ? (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Full Name:</strong>{" "}
                                    {selectedStudent.name}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong>{" "}
                                    {selectedStudent.email}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Roll Number:</strong>{" "}
                                    {selectedStudent.rollNumber}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Phone:</strong>{" "}
                                    {selectedStudent.phone}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Date of Birth:</strong>{" "}
                                    {selectedStudent.birth}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Status:</strong>{" "}
                                    {selectedStudent.status}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Address:</strong>{" "}
                                    {selectedStudent.address}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Class:</strong>{" "}
                                    {selectedStudent.class}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Department:</strong>{" "}
                                    {selectedStudent.department}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>GPA:</strong> {selectedStudent.GPA}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Attendance Rate:</strong>{" "}
                                    {selectedStudent.attendance}%
                                </Typography>
                            </Box>
                        ) : (
                            <Typography sx={{ mt: 2 }}>
                                No student data available.
                            </Typography>
                        )}

                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#030213",
                                    "&:hover": {
                                        backgroundColor: "#000000",
                                    },
                                }}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
