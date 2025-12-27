import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
    Stack,
    TextField,
} from "@mui/material";
import {
    Search as SearchIcon,
    VisibilityOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

// ===== Styled Search =====
const Search = styled("div")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f3f3f5",
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    marginBottom: theme.spacing(2),
}));

const SearchIconWrapper = styled("div")({
    marginRight: 8,
    display: "flex",
    alignItems: "center",
});

const StyledInputBase = styled(InputBase)({
    flex: 1,
});

export default function TableOfStudents({ rows, setRows, onEdit }) {
    const [searchText, setSearchText] = React.useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [studentToDelete, setStudentToDelete] = React.useState(null);

    const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
    const [viewStudent, setViewStudent] = React.useState(null);

    const [formDialogOpen, setFormDialogOpen] = React.useState(false);
    const [formMode, setFormMode] = React.useState("add"); // add | edit
    const [formStudent, setFormStudent] = React.useState(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // ===== Handlers =====
    const handleDeleteClick = (row) => {
        setStudentToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setRows(rows.filter((r) => r.id !== studentToDelete.id));
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
    };

    const handleShow = (row) => {
        setViewStudent(row);
        setViewDialogOpen(true);
    };

    const handleAdd = () => {
        setFormMode("add");
        setFormStudent({
            name: "",
            email: "",
            rollNo: "",
            class: "",
            department: "",
            status: "Active",
            phone: "",
            address: "",
            gpa: "",
        });
        setFormDialogOpen(true);
    };

    const handleEdit = (row) => {
        setFormMode("edit");
        setFormStudent({ ...row });
        setFormDialogOpen(true);
    };

    const handleFormChange = (field, value) => {
        setFormStudent({ ...formStudent, [field]: value });
    };

    const handleFormSave = () => {
        if (formMode === "add") {
            setRows([...rows, { id: Date.now(), ...formStudent }]);
        } else if (formMode === "edit") {
            setRows(
                rows.map((r) =>
                    r.id === formStudent.id ? { ...formStudent } : r
                )
            );
        }
        setFormDialogOpen(false);
    };

    // ===== Columns =====
    const columns = React.useMemo(
        () => [
            {
                field: "initials",
                headerName: "Logo",
                width: 70,
                renderCell: (params) => (
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "#ececf0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                        }}
                    >
                        {params.row.initials}
                    </Box>
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
                width: 120,
                renderCell: (params) => (
                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            fontSize: 13,
                        }}
                    >
                        <span
                            style={{
                                background:
                                    params.row.status === "Active"
                                        ? "#007FFF"
                                        : "#f0f0f0",
                                color:
                                    params.row.status === "Active"
                                        ? "white"
                                        : "black",
                                padding: "7px 11px",
                                borderRadius: "10px",
                            }}
                        >
                            {params.row.status}
                        </span>
                    </Box>
                ),
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 130,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <EditOutlined
                            onClick={() => handleEdit(params.row)}
                            style={{ cursor: "pointer" }}
                        />
                        <VisibilityOutlined
                            onClick={() => handleShow(params.row)}
                            style={{ cursor: "pointer" }}
                        />
                        <DeleteOutlined
                            onClick={() => handleDeleteClick(params.row)}
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Stack>
                ),
            },
        ],
        [rows]
    );

    const filteredRows = React.useMemo(() => {
        const lower = searchText.toLowerCase();
        return rows.filter(
            (row) =>
                row.name.toLowerCase().includes(lower) ||
                row.email.toLowerCase().includes(lower) ||
                row.rollNo.toLowerCase().includes(lower)
        );
    }, [rows, searchText]);

    // ===== Render =====
    return (
        <Box sx={{ width: "100%" }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="contained" sx={{ ml: 2 }} onClick={handleAdd}>
                    Add Student
                </Button>
            </Search>

            <DataGrid
                rows={filteredRows}
                columns={columns}
                autoHeight
                hideFooter
                disableRowSelectionOnClick
            />

            {/* View Student Dialog */}
            <Dialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Student Details</DialogTitle>
                <DialogContent>
                    {viewStudent && (
                        <Stack spacing={1.5} mt={1}>
                            {Object.keys(viewStudent).map((key) => (
                                <Typography key={key}>
                                    <b>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                        :
                                    </b>{" "}
                                    {viewStudent[key]}
                                </Typography>
                            ))}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Student Dialog */}
            <Dialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {formMode === "add" ? "Add Student" : "Edit Student"}
                </DialogTitle>
                <DialogContent>
                    {formStudent && (
                        <Stack spacing={1.5} mt={1}>
                            {[
                                "name",
                                "email",
                                "rollNo",
                                "class",
                                "department",
                                "status",
                                "phone",
                                "address",
                                "gpa",
                            ].map((f) => (
                                <TextField
                                    key={f}
                                    label={
                                        f.charAt(0).toUpperCase() + f.slice(1)
                                    }
                                    value={formStudent[f]}
                                    onChange={(e) =>
                                        handleFormChange(f, e.target.value)
                                    }
                                    fullWidth
                                    required
                                />
                            ))}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleFormSave}
                        variant="contained"
                        disabled={
                            formStudent &&
                            Object.values(formStudent).some(
                                (v) => v === "" || v === null
                            )
                        }
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setFormDialogOpen(false)}
                        variant="outlined"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Delete Student</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete{" "}
                        <strong>{studentToDelete?.name}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
