import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import GradeIcon from "@mui/icons-material/Grade";
import { Link, useLocation } from "react-router-dom";

const DRAWER_OPEN = 280;
const DRAWER_CLOSED = 72;

const openedMixin = (theme) => ({
    width: DRAWER_OPEN,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    width: DRAWER_CLOSED,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
});

export default function Sidebar({ open, setOpen, isMobile }) {
    const theme = useTheme();
    const location = useLocation();

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Students", icon: <GroupsIcon />, path: "/students" },
        { text: "Courses", icon: <LocalLibraryIcon />, path: "/courses" },
        {
            text: "Attendance",
            icon: <EventAvailableIcon />,
            path: "/attendance",
        },
        { text: "Grades", icon: <GradeIcon />, path: "/grades" },
        { text: "Teachers", icon: <SchoolIcon />, path: "/teachers" },
        { text: "Finance", icon: <AttachMoneyIcon />, path: "/finance" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    return (
        <Box>
            {/* زرار Menu على الموبايل */}
            {isMobile && (
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        position: "fixed",
                        top: 16,
                        left: 16,
                        zIndex: theme.zIndex.drawer + 2,
                        bgcolor: "#fff",
                        boxShadow: 1,
                        display: open ? "none" : "flex",
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Drawer */}
            <MuiDrawer
                variant={isMobile ? "temporary" : "permanent"}
                open={open}
                onClose={() => setOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        ...(isMobile
                            ? { width: DRAWER_OPEN }
                            : open
                            ? openedMixin(theme)
                            : closedMixin(theme)),
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2,
                        py: 2,
                        flexDirection: open ? "row" : "column-reverse",
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#007FFF",
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SchoolIcon sx={{ color: "#fff" }} />
                    </Box>

                    {open && (
                        <Box>
                            <Typography fontWeight="bold">EduManage</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                Student Management
                            </Typography>
                        </Box>
                    )}

                    {!isMobile && (
                        <IconButton
                            sx={{ ml: "auto" }}
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                    )}
                </Box>

                <Divider />

                {/* Menu Items */}
                <List sx={{ px: 1 }}>
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={() => isMobile && setOpen(false)}
                                    sx={{
                                        minHeight: 48,
                                        px: 2,
                                        borderRadius: 2,
                                        justifyContent: open
                                            ? "flex-start"
                                            : "center",
                                        bgcolor: active
                                            ? "#007FFF22"
                                            : "transparent",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 2 : "auto",
                                            color: active
                                                ? "#007FFF"
                                                : "inherit",
                                        }}
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
            </MuiDrawer>
        </Box>
    );
}
