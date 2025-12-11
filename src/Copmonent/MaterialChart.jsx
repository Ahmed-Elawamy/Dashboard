import { Pie, PieChart, Tooltip } from "recharts";

export default function materialChart() {
    const data = [
        { name: "Science ", num: 35 },
        { name: "Math ", num: 13 },
        { name: "C++ ", num: 33 },
        { name: "Java ", num: 53 },
    ];
    let isAnimationActive = true;

    return (
        <PieChart width={400} height={400}>
            <Pie
                activeShape={{
                    fill: "#007FFF",
                }}
                data={data}
                dataKey="num"
                isAnimationActive={isAnimationActive}
            />
            <Tooltip defaultIndex={2} />
        </PieChart>
    );
}
