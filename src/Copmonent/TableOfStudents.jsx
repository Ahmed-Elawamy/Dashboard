import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Modal,
    Fade,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    useMediaQuery,
    useTheme,
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flex: 1,
}));

export default function TableOfStudents({ rows, setRows, onEdit, isMobile }) {
    const [searchText, setSearchText] = React.useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [studentToDelete, setStudentToDelete] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // فتح نافذة التأكيد
    const handleDeleteClick = (row) => {
        setStudentToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setRows(rows.filter((r) => r.id !== studentToDelete.id));
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
    };

    const columns = React.useMemo(
        () => [
            {
                field: "initials",
                headerName: "Logo",
                width: 70,
                renderCell: (params) => (
                    <div
                        style={{
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#ececf0",
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
                width: 120,
                renderCell: (params) => (
                    <Box
                        sx={{
                            borderRadius: 1,
                            paddingX: 1,
                            paddingY: 0.5,
                            textAlign: "center",
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
                width: 120,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <EditOutlined
                            onClick={() => onEdit(params.row)}
                            style={{ cursor: "pointer" }}
                            title="Edit"
                        />
                        <VisibilityOutlined
                            onClick={() => alert("Show student details")}
                            style={{ cursor: "pointer" }}
                            title="View"
                        />
                        <DeleteOutlined
                            onClick={() => handleDeleteClick(params.row)}
                            style={{ cursor: "pointer", color: "red" }}
                            title="Delete"
                        />
                    </Box>
                ),
            },
        ],
        [onEdit, rows]
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
            </Search>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    hideFooter={true}
                />
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                fullWidth
                maxWidth="xs"
                fullScreen={fullScreen}
            >
                <DialogTitle>Delete Student</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete{" "}
                        <strong>{studentToDelete?.name}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
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
