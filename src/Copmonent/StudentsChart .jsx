import { Box, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Sep", students: 200 },
    { month: "Oct", students: 250 },
    { month: "Nov", students: 300 },
    { month: "Dec", students: 280 },
    { month: "Jan", students: 280 },
];


export default function StudentsChart() {
    return (
        <Box
            sx={{
                width: "38%",
                height: 300,
                mt: 4,
                background: "white",
                padding: "43px",
                borderRadius: "11px",
                boxShadow: "1px 1px 5px 5px #0000001a",
            }}
        >
            <Typography
                variant="h6"
                sx={{ mb: 2, transform: "translate(-22px, -22px)", fontWeight: "300" }}
            >
                Students Growth
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="students"
                        fill="#007FFF"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
