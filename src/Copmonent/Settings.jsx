import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import General from "./CompSettings/General";
import Academic from "./CompSettings/Academic";
import Notifications from "./CompSettings/Notifications";
import Security from "./CompSettings/Security";

const AntTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
        backgroundColor: "#1890ff",
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        minWidth: 0,
        [theme.breakpoints.up("sm")]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: "rgba(0, 0, 0, 0.85)",
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
        },
        "&.Mui-selected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#d1eaff",
        },
    })
);

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#635ee7",
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: "rgba(255, 255, 255, 0.7)",
        "&.Mui-selected": {
            color: "#fff",
        },
        "&.Mui-focusVisible": {
            backgroundColor: "rgba(100, 95, 228, 0.32)",
        },
    })
);
function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function Settings() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Typography
                variant="h5"
                sx={{ textAlign: "left", fontWeight: "600" }}
            >
                Settings
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: "left", fontWeight: "300" }}
            >
                Manage system preferences and configurations
            </Typography>
            <Container
                maxWidth="xlg"
                sx={{
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                }}
            >

                <Box sx={{ width: "100%" }}>
                    <Box sx={{ bgcolor: "#fff" }}>
                        <AntTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="ant example"
                        >
                            <AntTab label="General" />
                            <AntTab label="Academic" />
                            <AntTab label="Notifications" />
                            <AntTab label="Security" />
                        </AntTabs>
                        <TabPanel value={value} index={0}>
                            <General />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <Academic />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <Notifications />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <Security />
                        </TabPanel>

                        <Box sx={{ p: 3 }} />
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Settings;
