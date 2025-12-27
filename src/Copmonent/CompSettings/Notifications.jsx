import React from "react";
import {
    Typography,
    Paper,
    FormControlLabel,
    Switch,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* ========= IOS Switch ========= */
const IOSSwitch = styled((props) => <Switch disableRipple {...props} />)(
    ({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,

        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",

            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",

                "& + .MuiSwitch-track": {
                    backgroundColor: "#65C466",
                    opacity: 1,
                    border: 0,
                },
            },

            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },

        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
        },

        "& .MuiSwitch-track": {
            borderRadius: 13,
            backgroundColor: "#E9E9EA",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    })
);

/* ========= Component ========= */
function Notifications() {
    const items = [
        {
            h: "Student Enrollment",
            p: "Get notified when new students enroll",
        },
        { h: "Fee Payments", p: "Get notified about fee payments" },
        { h: "Attendance Alerts", p: "Get notified about low attendance" },
        { h: "Grade Submissions", p: "Get notified when grades are submitted" },
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 3,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Email Notifications
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Configure email notification preferences
            </Typography>

            {items.map((title, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 2,
                        borderBottom:
                            index !== items.length - 1
                                ? "1px solid #e5e5e5"
                                : "none",
                    }}
                >
                    <Box>
                        <Typography fontWeight={600}>{title.h}</Typography>
                        <Typography variant="body2" sx={{ color: "#455595" }}>
                            {title.p}
                        </Typography>
                    </Box>

                    <FormControlLabel
                        control={<IOSSwitch defaultChecked />}
                        label=""
                    />
                </Box>
            ))}
        </Paper>
    );
}

export default Notifications;
