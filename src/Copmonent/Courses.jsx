import * as React from "react";
import { Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InputBase from "@mui/material/InputBase";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import theData from "../../coursesData.json";

import { Grid } from "@mui/material";

import { Modal, Backdrop, Fade } from "@mui/material";
import FormDialog from "./FormDialog.jsx";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: "rotate(0deg)",
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: "rotate(180deg)",
            },
        },
    ],
}));
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
        backgroundColor: "#ffff",
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
function Courses() {
    const [infoCourses, setInfoCourses] = React.useState({
        id: "",
        name: "",
        description: "",
        status: "",
        students_enrolled: "",
        duration_weeks: "",
        teacher: "",
        department: "",
        phone: "",
    });

    const [coursesData, setCoursesData] = React.useState(theData);
    const [dialogForm, setDialogForm] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editStudentData, setEditStudentData] = React.useState({});
    const [mode, setMode] = React.useState("add"); // add | edit

    const filterdCourseSearch = React.useMemo(() => {
        const searchLower = searchText.toLowerCase();
        return coursesData.filter((c) => {
            return (
                c.name.toLowerCase().includes(searchLower) ||
                c.id.toLowerCase().includes(searchLower) ||
                c.teacher.toLowerCase().includes(searchLower)
            );
        });
    }, [searchText, coursesData]);

    const handleShow = (e) => {
        setEditStudentData(e);
        setOpenDialog(true);
    };
    const handleManage = (e) => {
        setMode("edit");
        setEditStudentData(e);
        setDialogForm(true);
    };
    const handleDelete = (e) => {
        const updated = coursesData.filter((c) => {
            return c.id !== e.id;
        });
        setCoursesData(updated);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 5 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    margin: "25px 0",
                }}
            >
                <div>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "left", fontWeight: "600" }}
                    >
                        Courses
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: "left", fontWeight: "300" }}
                    >
                        Manage courses and curriculum
                    </Typography>
                </div>
                <Button
                    // onClick={handleAdd}
                    onClick={() => setDialogForm(true)}
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    sx={{
                        background: "black",
                        color: "white",
                        padding: "10px 14px",
                        borderRadius: "10px",
                    }}
                >
                    Add Course
                </Button>
            </div>

            <Search sx={{ background: "white", position: "relative" }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    style={{ width: "100%" }}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Search>

            <Container maxWidth="lg" sx={{ pt: 5 }}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        // display: "grid",
                        // gridTemplateColumns:
                        //     "repeat(auto-fit, minmax(250px, 1fr))",
                        // gap: "85px",
                        // gap: "50px",
                        // gap: "20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {filterdCourseSearch.map((course) => {
                        return (
                            <Grid
                                container
                                xs={12}
                                sm={6}
                                md={3}
                                key={course.id}
                            >
                                <Card
                                    key={course.id}
                                    sx={{
                                        maxWidth: 345,
                                        marginTop: "40px",
                                        padding: "19px 11px",
                                        borderRadius: "15px",
                                        // minWidth: "334px",
                                        height: " 90%",
                                    }}
                                >
                                    <CardHeader
                                        sx={{ color: "black" }}
                                        avatar={
                                            <Avatar
                                                sx={{ bgcolor: "#007fff" }}
                                                aria-label="recipe"
                                            >
                                                <MenuBookIcon />
                                            </Avatar>
                                        }
                                        action={
                                            <div
                                                aria-label="settings"
                                                style={{
                                                    // background: "#070606ff",
                                                    background:
                                                        course.status ==
                                                        "Active"
                                                            ? "#070606ff"
                                                            : "#f1f1f1",
                                                    color:
                                                        course.status ==
                                                        "Active"
                                                            ? "white"
                                                            : "black",
                                                    width:
                                                        course.status ==
                                                        "Active"
                                                            ? "74px"
                                                            : "106px",
                                                    fontSize: "16px",
                                                    height: "39px",
                                                    borderRadius: "20px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {course.status}
                                            </div>
                                        }
                                        title={course.name}
                                        subheader={course.id}
                                    />
                                    <p
                                        style={{
                                            color: "#00000081",
                                            textAlign: "center",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {course.description}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            color: "#00000081",
                                        }}
                                    >
                                        <GroupOutlinedIcon />
                                        {course.students_enrolled} students
                                        enrolled
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            color: "#00000081",
                                            marginTop: "12px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <AccessTimeOutlinedIcon />
                                        {course.duration_weeks} weeks
                                    </div>
                                    <hr
                                        style={{
                                            borderStyle: "ridge",
                                            borderColor: "none",
                                            color: "#e5e5e5",
                                        }}
                                    />
                                    <div style={{ color: "#776c6cff" }}>
                                        Teacher{" "}
                                    </div>
                                    <p style={{ fontSize: "19px" }}>
                                        {course.teacher}
                                    </p>
                                    <div
                                        style={{
                                            fontSize: "19px",
                                            color: "#776c6cff",
                                        }}
                                    >
                                        Department
                                    </div>

                                    <div
                                        style={{
                                            border: "1px solid #cec9c9ff",
                                            display: "block",
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            width: "fit-content",
                                            margin: "9px 0",
                                        }}
                                    >
                                        {course.department}
                                    </div>

                                    <CardActions
                                        sx={{ justifyContent: "center" }}
                                    >
                                        <IconButton
                                            onClick={() => handleShow(course)}
                                            sx={{
                                                color: "black",
                                                background: "white",
                                                borderRadius: "14px",
                                                padding: "10px 9px",
                                                fontSize: "18px",
                                                border: "1px solid  #e5e5e5",
                                                marginRight: "10px",
                                                "&:hover": {
                                                    // background:
                                                    //     "#007fff !important",
                                                    background:
                                                        "#e5e5e5 !important",
                                                    color: "black",
                                                },
                                            }}
                                            aria-label="View Details"
                                        >
                                            View Details
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleManage(course)}
                                            sx={{
                                                color: "black",
                                                background: "white",
                                                borderRadius: "14px",
                                                padding: "10px 9px",
                                                fontSize: "18px",
                                                border: "1px solid rgb(206, 201, 201)",
                                                "&:hover": {
                                                    background:
                                                        "#007fff !important",
                                                    color: "white",
                                                },
                                            }}
                                            aria-label="Manage"
                                        >
                                            Manage
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(course)}
                                            sx={{
                                                color: "black",
                                                background: "white",
                                                borderRadius: "14px",
                                                padding: "10px 9px",
                                                fontSize: "18px",
                                                border: "1px solid rgb(206, 201, 201)",
                                                transition: "0.3s",

                                                "&:hover": {
                                                    background:
                                                        "#d30808ff !important",
                                                    color: "white",
                                                },
                                            }}
                                            aria-label="Delete"
                                        >
                                            Delete
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openDialog}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ mb: 2 }}
                        >
                            Student Information
                        </Typography>

                        {editStudentData ? (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Course Name:</strong>
                                    {editStudentData.name}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Course ID:</strong>{" "}
                                    {editStudentData.id}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Description:</strong>{" "}
                                    {editStudentData.description}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Phone:</strong>{" "}
                                    {editStudentData.phone}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>status:</strong>{" "}
                                    {editStudentData.status}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Students Enrolled:</strong>{" "}
                                    {editStudentData.students_enrolled}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Duration Weeks:</strong>{" "}
                                    {editStudentData.duration_weeks}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Teacher:</strong>{" "}
                                    {editStudentData.teacher}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>department:</strong>{" "}
                                    {editStudentData.department}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography sx={{ mt: 2 }}>
                                No Course data available.
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
                                onClick={() => setOpenDialog(false)}
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

            {/* Form Dialog */}
            <FormDialog
                setDialogForm={setDialogForm}
                dialogForm={dialogForm}
                infoCourses={infoCourses}
                setInfoCourses={setInfoCourses}
                setCoursesData={setCoursesData}
                coursesData={coursesData}
                editStudentData={editStudentData}
                setEditStudentData={setEditStudentData}
                mode={mode}
            />
        </Container>
    );
}

export default Courses;
