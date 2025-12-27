import React from "react";
import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";

export default function StudentsChart() {
    const data = [200, 250, 300, 280, 280];
    const categories = ["Sep", "Oct", "Nov", "Dec", "Jan"];

    const options = {
        chart: { type: "bar", toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
        xaxis: { categories },
        tooltip: { y: { formatter: (val) => `${val} Students` } },
        colors: ["#007FFF"],
    };

    const series = [{ name: "Students", data }];

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
                Students Growth
            </Typography>
            <Chart
                options={options}
                series={series}
                type="bar"
                height="100%"
                width="100%"
            />
        </Box>
    );
}
