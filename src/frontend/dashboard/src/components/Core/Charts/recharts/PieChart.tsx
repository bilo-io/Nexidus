import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

export type PieChartData = {
    name: string;
    value: number;
};

export const palette = [
    '#09A8AA', '#DD0838', '#0000FF', '#FFA500', '#00aedd', '#008000', '#800080', "#008000"
]

interface PieData {
    name: string;
    value: number;
}

export function getPieData<T extends Record<string, any>>(
    data: T[],
    key: keyof T
) {
    const counts = data.reduce<Record<string, number>>((acc, item) => {
        const value = String(item[key]);
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({
        name,
        value,
    }));
}

interface PieChartComponentProps {
    data: PieChartData[];
    colors: string[];
    className?: string,
    innerRadius?: number;
    outerRadius?: number;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
    data,
    colors,
    // className,
    innerRadius = 40,
    outerRadius = 80,
    className=''
}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart className={className}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    fill="#8884d8"
                    label
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
