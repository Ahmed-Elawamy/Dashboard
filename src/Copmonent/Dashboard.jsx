import "../App.css";
import StudentsChart from "./StudentsChart ";
import MaterialChart from "./MaterialChart";
import * as React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
} from "@mui/material";

// MUI Icons
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

function Dashboard() {
    const cards = [
        {
            title: "Total Students",
            value: "260",
            change: "+12% from last month",
            icon: (
                <PeopleOutlinedIcon sx={{ fontSize: 32, color: "#45556c" }} />
            ),
        },
        {
            title: "Active Courses",
            value: "45",
            change: "8 new this semester",
            icon: (
                <LocalLibraryOutlinedIcon
                    sx={{ fontSize: 32, color: "#45556c" }}
                />
            ),
        },
        {
            title: "Attendance Rate",
            value: "95.4%",
            change: "+2.3% from last week",
            icon: (
                <TrendingUpOutlinedIcon
                    sx={{ fontSize: 32, color: "#45556c" }}
                />
            ),
        },
        {
            title: "Revenue (Monthly)",
            value: "$125,400",
            change: "+8% from last month",
            icon: (
                <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 32, color: "#45556c" }}
                />
            ),
        },
    ];

    return (
        <>
            <Typography
                variant="h5"
                sx={{ textAlign: "left", fontWeight: "600" }}
            >
                Dashboard
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: "left", fontWeight: "300" }}
            >
                Welcome to your student management system
            </Typography>

            <Container maxWidth="lg" sx={{ pt: 5 }}>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                    }}
                >
                    {cards.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    p: 2,
                                    height: 160,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    border: "1px solid #e0e0e0",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "300" }}>
                                        {item.title}
                                    </Typography>

                                    {item.icon}
                                </Box>

                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: "300" }}
                                >
                                    {item.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        color: "gray",
                                        fontWeight: "300",
                                    }}
                                >
                                    {item.change}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container>
                    <StudentsChart />
                    <MaterialChart />
                </Grid>
            </Container>
        </>
    );
}

export default Dashboard;
