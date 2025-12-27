import * as React from "react";
import { Box, Modal, Fade, Typography, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Search as SearchIcon,
    VisibilityOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";

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
    // width: 300,
    marginBottom: 16,
        width: "75%"

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

    const handleDelete = (row) => {
        if (window.confirm(`Delete ${row.name}?`)) {
            const updated = teachers.filter((t) => t.id !== row.id);
            setRows({ ...rows, teachers: updated });
        }
    };

    const handleSave = () => {
        if (mode === "edit") {
            const updated = teachers.map((t) =>
                t.id === formData.id ? formData : t
            );
            setRows({ ...rows, teachers: updated });
        } else if (mode === "add") {
            setRows({ ...rows, teachers: [...teachers, formData] });
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
                renderCell: (params) => {
                    const name = params.row.name || "";
                    const initials = name
                        .split(" ")
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
            { field: "department", headerName: "Department", width: 150 },
            { field: "subject", headerName: "Subject", width: 160 },
            {
                field: "experienceYears",
                headerName: "Experience",
                width: 140,
                valueFormatter: (params) => `${params.value} years`,
            },
            {
                field: "coursesCount",
                headerName: "Courses",
                width: 120,
                valueFormatter: (params) => `${params.value} courses`,
            },
            {
                field: "status",
                headerName: "Status",
                width: 120,
                renderCell: (params) => (
                    <Box
                        sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            // bgcolor:
                            //     params.value === "Active"
                            //         ? "#030213"
                            //         : "#e0e0e0",
                            color:
                                params.value === "Active"
                                    ? "#0a7c13ff"
                                    : "#000",
                            fontSize: 13,
                            fontWeight: "bold",
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
                    <Box sx={{ display: "flex", gap: 1 }}>
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
                            onClick={() => handleDelete(params.row)}
                        />
                    </Box>
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
                sx={{ display: "flex", justifyContent: "space-around",flexWrap: "wrap", mb: 2 }}
            >
                <Search sx={{width: isMobile ? "100%": "auto%"}}>
                    <SearchIcon />
                    <StyledInputBase
                        placeholder="Search by name, email, subject or department…"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Search>

                <Button variant="contained" onClick={handleAdd}>
                    Add Teacher
                </Button>
            </Box>

            <Box sx={{ height: 420, width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                />
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: "Backdrop" }}
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
                                        label={
                                            f.charAt(0).toUpperCase() +
                                            f.slice(1)
                                        }
                                        value={formData[f]}
                                        onChange={(e) =>
                                            handleChange(f, e.target.value)
                                        }
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        disabled={mode === "view"}
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
                                />

                                <Box sx={{ mt: 2, textAlign: "right" }}>
                                    {mode !== "view" && (
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                            sx={{ mr: 1, bgcolor: "#030213" }}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpen(false)}
                                        sx={{
                                            borderColor: "#030213",
                                            color: "#030213",
                                        }}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
