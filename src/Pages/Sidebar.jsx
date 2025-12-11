import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import GradeIcon from "@mui/icons-material/Grade";
import { Link, useLocation } from "react-router-dom";

import "../App.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
}));

export default function Sidebar() {
    const location = useLocation();

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard",
        },
        { text: "Students", icon: <GroupsIcon />, path: "/students" },
        { text: "Courses", icon: <LocalLibraryIcon />, path: "/courses" },
        {
            text: "Attendance",
            icon: <EventAvailableIcon />,
            path: "/attendance",
        },
        { text: "Grades", icon: <GradeIcon />, path: "/grades" },
        { text: "Teachers", icon: <SchoolIcon />, path: "/techers" },
        { text: "Finance", icon: <AttachMoneyIcon />, path: "/finance" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                    color: "black",
                }}
            >
                <Toolbar
                    sx={{
                        p: 0,
                        display: open ? "none" : "flex",
                        alignItems: "center",
                        minHeight: "48px !important",
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            ml: 1,
                            position: "absolute",
                            left: "4px",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    "& .MuiDrawer-paper": open
                        ? openedMixin(theme)
                        : closedMixin(theme),
                }}
            >
                <DrawerHeader
                    style={{
                        minHeight: "20px !important",
                        height: "40px !important",
                        maxHeight: "4px !important",
                    }}
                >
                    <IconButton
                        onClick={handleDrawerClose}
                        style={{
                            display: open ? "flex" : "none",

                            padding: 0,
                            margin: 0,
                            minHeight: "0px !important",
                        }}
                    >
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        height: 70,
                        width: "100%",
                        p: 1.5,
                        boxSizing: "border-box",
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#007FFF",
                            width: 45,
                            height: 45,
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: 28, color: "#fff" }} />
                    </Box>
                    {open && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                            >
                                EduManage
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Student Management
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Divider />

                <List>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <ListItem
                                key={item.text}
                                disablePadding
                                sx={{ display: "block" }}
                            >
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                            borderRadius: 2,
                                            justifyContent: open
                                                ? "initial"
                                                : "center",
                                        },
                                        isActive && {
                                            backgroundColor: "#007FFF22",
                                            color: "#007FFF",
                                            "& svg": { color: "#007FFF" }, // لون الأيقونة
                                            fontWeight: "bold",
                                        },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: "center",
                                                mr: open ? 3 : "auto",
                                            },
                                            isActive && {
                                                color: "#007FFF",
                                            },
                                        ]}
                                    >
                                        {item.icon}
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={item.text}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
}
