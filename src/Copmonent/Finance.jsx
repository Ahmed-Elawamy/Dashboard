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
import DataFinance from "../../financeData.json";
import TableOfFinance from "./TableOfFinance.jsx";
// MUI Icons
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

function Finance({ isMobile }) {
    const [rows, setRows] = React.useState(DataFinance);
    const cards = [
        {
            title: "Total Revenue ",
            value: `${rows.summary.totalRevenue.value}`,
            change: `${rows.summary.totalRevenue.change}`,
            icon: (
                <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
        {
            title: "Pending Fees",
            value: `${rows.summary.pendingFee.value}`,
            change: `${rows.summary.pendingFee.note}`,
            icon: (
                <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
        {
            title: "Collection Rate",
            value: `${rows.summary.collectionRate.value}`,
            change: `${rows.summary.collectionRate.note}`,
            icon: (
                <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 32, color: "#007fff" }}
                />
            ),
        },
        {
            title: "Expected Total",
            value: `${rows.summary.expectedTotal.value}`,
            change: `${rows.summary.expectedTotal.note}`,
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
                sx={{ textAlign: "left", fontWeight: "600" }}
            >
                Finance & Fees
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: "left", fontWeight: "300" }}
            >
                Manage student fees and financial records
            </Typography>

            <Container
                maxWidth="lg"
                sx={{
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                }}
            >
                {/* <Grid
                    container
                    spacing={{ xs: 2, sm: 3 }}
                    sx={{
                        marginBottom: { xs: 3, sm: 4, md: "50px" },
                    }}
                >
                    {cards.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    p: { xs: 1.5, sm: 2 },
                                    height: { xs: "auto", sm: 160 },
                                    minHeight: { xs: 140, sm: 160 },
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
                                    <Typography
                                        sx={{
                                            fontWeight: "300",
                                            fontSize: {
                                                xs: "0.875rem",
                                                sm: "1rem",
                                            },
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    {item.icon}
                                </Box>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: "300",
                                        fontSize: {
                                            xs: "1.25rem",
                                            sm: "1.5rem",
                                        },
                                    }}
                                >
                                    {item.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: { xs: 11, sm: 13 },
                                        color: "gray",
                                        fontWeight: "300",
                                    }}
                                >
                                    {item.change}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid> */}

                {/* ========= Start Boxes ========== */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                        mt: 2,
                        margin: "40px 0",
                    }}
                >
                    {cards.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                flex: "1 1 214px",
                                maxWidth: 260,
                                height: 194,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 4,
                                border: "1px solid #e0e0e0",
                                p: 2,
                                textAlign: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                gap: 1,
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
                {/* ========= End Boxes ========== */}

                <TableOfFinance
                    rows={rows}
                    setRows={setRows}
                    isMobile={isMobile}
                />
            </Container>
        </>
    );
}

export default Finance;
