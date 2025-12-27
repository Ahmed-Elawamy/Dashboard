import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import StudentsChart from "./StudentsChart ";
import MaterialChart from "./MaterialChart";

function Dashboard() {
    const cards = [
        {
            title: "Total Students",
            value: "260",
            change: "+12% from last month",
            icon: (
                <PeopleOutlinedIcon sx={{ fontSize: 32, color: "#007fff" }} />
            ),
        },
        {
            title: "Active Courses",
            value: "45",
            change: "8 new this semester",
            icon: (
                <LocalLibraryOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
        {
            title: "Attendance Rate",
            value: "95.4%",
            change: "+2.3% from last week",
            icon: (
                <TrendingUpOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
        {
            title: "Revenue (Monthly)",
            value: "$125,400",
            change: "+8% from last month",
            icon: (
                <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
    ];

    return (
        <>
            <Typography
                variant="h5"
                sx={{ textAlign: "left", fontWeight: 600 }}
            >
                Dashboard
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: "left", fontWeight: 300 }}
            >
                Welcome to your student management system
            </Typography>
            <Container maxWidth="lg" sx={{ pt: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                        mt: 2,
                    }}
                >
                    
                    {cards.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                flex: "1 1 214px",
                                maxWidth: 260,
                                height: 176,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 4,
                                border: "1px solid #e0e0e0",
                                p: 2,
                                textAlign: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            }}
                        >
                            {item.icon}
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    fontSize: "1rem",
                                    mt: 1,
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 300,
                                    mt: 0.5,
                                    color: "#007fff",
                                }}
                            >
                                {item.value}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 12, color: "gray", mt: 0.5 }}
                            >
                                {item.change}
                            </Typography>
                        </Card>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        mt: 4,
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ flex: "1 1 300px", maxWidth: 600 }}>
                        <StudentsChart />
                    </Box>
                    <Box sx={{ flex: "1 1 300px", maxWidth: 600 }}>
                        <MaterialChart />
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Dashboard;
