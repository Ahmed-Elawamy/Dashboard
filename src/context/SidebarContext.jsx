import * as React from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = React.useState(true); // Always open by default

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const toggleDrawer = () => setOpen((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{
                open,
                isMobile,
                handleDrawerOpen,
                handleDrawerClose,
                toggleDrawer,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }
    return context;
};

