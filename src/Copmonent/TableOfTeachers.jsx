import * as React from "react";
import {
    Box,
    Modal,
    Fade,
    Typography,
    Button,
    TextField,
    Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Search as SearchIcon,
    VisibilityOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import toast from "react-hot-toast";

/* ===== Styles ===== */

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const Search = styled("div")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f3f3f5",
    padding: "6px 10px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    width: "100%",
    maxWidth: 360,
}));

const StyledInputBase = styled(InputBase)(() => ({
    width: "100%",
}));

/* ===== Component ===== */

export default function TableOfTeachers({ rows, setRows, isMobile }) {
    const teachers = rows.teachers || [];

    const [searchText, setSearchText] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState("view"); // view | edit | add
    const [formData, setFormData] = React.useState(null);

    // Delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [teacherToDelete, setTeacherToDelete] = React.useState(null);

    /* ===== Handlers ===== */

    const handleView = (row) => {
        setMode("view");
        setFormData(row);
        setOpen(true);
    };

    const handleEdit = (row) => {
        setMode("edit");
        setFormData(row);
        setOpen(true);
    };

    const handleAdd = () => {
        setMode("add");
        setFormData({
            id: Date.now().toString(),
            name: "",
            email: "",
            phone: "",
            department: "",
            subject: "",
            experienceYears: 0,
            coursesCount: 0,
            status: "Active",
        });
        setOpen(true);
    };

    const handleDeleteClick = (row) => {
        setTeacherToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setRows({
            ...rows,
            teachers: teachers.filter((t) => t.id !== teacherToDelete.id),
        });
        setDeleteDialogOpen(false);
        setTeacherToDelete(null);
        toast.success("Teacher Deleted successfully");
    };

    const handleSave = () => {
        if (mode === "edit") {
            setRows({
                ...rows,
                teachers: teachers.map((t) =>
                    t.id === formData.id ? formData : t
                ),
            });
            toast.success("Teacher Information Edited successfully");
        } else if (mode === "add") {
            setRows({
                ...rows,
                teachers: [...teachers, formData],
            });
            toast.success("Teacher Added successfully");
        }
        setOpen(false);
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    /* ===== Columns ===== */

    const columns = React.useMemo(
        () => [
            {
                field: "initials",
                headerName: "",
                width: 70,
                sortable: false,
                renderCell: (params) => {
                    const initials = params.row.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("");
                    return (
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
                            {initials}
                        </Box>
                    );
                },
            },
            { field: "name", headerName: "Teacher", width: 200 },
            { field: "department", headerName: "Department", width: 160 },
            { field: "subject", headerName: "Subject", width: 160 },
            {
                field: "experienceYears",
                headerName: "Experience",
                width: 140,
                valueFormatter: (p) => `${p.value} years`,
            },
            {
                field: "coursesCount",
                headerName: "Courses",
                width: 120,
                valueFormatter: (p) => `${p.value} courses`,
            },
            {
                field: "status",
                headerName: "Status",
                width: 120,
                renderCell: (params) => (
                    <Box
                        sx={{
                            fontWeight: "bold",
                            fontSize: 13,
                            color:
                                params.value === "Active" ? "#0a7c13" : "#000",
                        }}
                    >
                        {params.value}
                    </Box>
                ),
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 150,
                sortable: false,
                renderCell: (params) => (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <VisibilityOutlined
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleView(params.row)}
                        />
                        <EditOutlined
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleEdit(params.row)}
                        />
                        <DeleteOutlined
                            sx={{ cursor: "pointer", color: "#f44336" }}
                            onClick={() => handleDeleteClick(params.row)}
                        />
                    </Stack>
                ),
            },
        ],
        [teachers]
    );

    /* ===== Filtering ===== */

    const filteredRows = React.useMemo(() => {
        const s = searchText.toLowerCase();
        return teachers.filter(
            (t) =>
                t.name.toLowerCase().includes(s) ||
                t.email.toLowerCase().includes(s) ||
                t.subject.toLowerCase().includes(s) ||
                t.department.toLowerCase().includes(s)
        );
    }, [searchText, teachers]);

    /* ===== Render ===== */

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2,
                }}
            >
                <Search>
                    <SearchIcon />
                    <StyledInputBase
                        placeholder="Search teacher…"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Search>

                <Button
                    variant="contained"
                    onClick={handleAdd}
                    sx={{ height: "43px" }}
                >
                    Add Teacher
                </Button>
            </Box>

            {/* === الجدول === */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "auto",
                }}
            >
                <Box sx={{ minWidth: 900, height: 420 }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                        hideFooter
                    />
                </Box>
            </Box>

            {/* === Modal Add/Edit/View === */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        {formData && (
                            <>
                                <Typography variant="h6" mb={2}>
                                    {mode === "view"
                                        ? "Teacher Details"
                                        : mode === "edit"
                                        ? "Edit Teacher"
                                        : "Add Teacher"}
                                </Typography>

                                {[
                                    "name",
                                    "email",
                                    "phone",
                                    "department",
                                    "subject",
                                ].map((f) => (
                                    <TextField
                                        key={f}
                                        label={f}
                                        value={formData[f]}
                                        onChange={(e) =>
                                            handleChange(f, e.target.value)
                                        }
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        disabled={mode === "view"}
                                        required
                                    />
                                ))}

                                <TextField
                                    label="Experience (years)"
                                    type="number"
                                    value={formData.experienceYears}
                                    onChange={(e) =>
                                        handleChange(
                                            "experienceYears",
                                            +e.target.value
                                        )
                                    }
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={mode === "view"}
                                    required
                                />

                                <TextField
                                    label="Courses Count"
                                    type="number"
                                    value={formData.coursesCount}
                                    onChange={(e) =>
                                        handleChange(
                                            "coursesCount",
                                            +e.target.value
                                        )
                                    }
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={mode === "view"}
                                    required
                                />

                                <TextField
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e) =>
                                        handleChange("status", e.target.value)
                                    }
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={mode === "view"}
                                    required
                                />

                                <Box sx={{ textAlign: "right" }}>
                                    {mode !== "view" && (
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                            sx={{ mr: 1 }}
                                            disabled={Object.values(
                                                formData
                                            ).some(
                                                (v) => v === "" || v === null
                                            )}
                                        >
                                            {mode === "add" ? "Add" : "Save"}
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>

            {/* === Delete Confirmation Dialog === */}
            <Modal
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                closeAfterTransition
            >
                <Fade in={deleteDialogOpen}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" mb={2}>
                            Delete Teacher
                        </Typography>
                        <Typography mb={3}>
                            Are you sure you want to delete{" "}
                            <strong>{teacherToDelete?.name}</strong>?
                        </Typography>
                        <Box sx={{ textAlign: "right" }}>
                            <Button
                                variant="outlined"
                                onClick={() => setDeleteDialogOpen(false)}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteConfirm}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
