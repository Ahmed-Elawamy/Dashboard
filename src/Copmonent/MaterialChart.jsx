import React from "react";
import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";

export default function MaterialChart() {
    const series = [35, 13, 33, 53];
    const labels = ["Science", "Math", "C++", "Java"];

    const options = {
        chart: { type: "pie" },
        labels: labels,
        colors: ["#007FFF", "#00BFFF", "#1E90FF", "#87CEFA"],
        legend: { position: "bottom" },
        tooltip: { y: { formatter: (val) => `${val} Students` } },
        dataLabels: { enabled: true },
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: 300, md: 400 },
                mt: 4,
                background: "white",
                padding: 3,
                borderRadius: "11px",
                boxShadow: "1px 1px 5px 5px #0000001a",
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 300 }}>
                Students by Subject
            </Typography>
            <Chart
                options={options}
                series={series}
                type="pie"
                height="100%"
                width="100%"
            />
        </Box>
    );
}
