import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export interface BoxWhiskerStats {
    min: number;
    max: number;
    lowerQuartile: number;
    upperQuartile: number;
    interquartileRange: number;
    median: number;
    lowerWhisker: number;
    upperWhisker: number;
}

interface BoxWhiskerPlotProps {
    stats: BoxWhiskerStats;
    width?: number;
    height?: number;
    color?: string;
}

export const BoxWhiskerPlot: React.FC<BoxWhiskerPlotProps> = ({
    stats,
    color: strokeColor,
    width = 300,
    height = 120, // Increased height slightly for labels
}) => {
    const { min, max, lowerQuartile, upperQuartile, median, lowerWhisker, upperWhisker } = stats;
    const { theme } = useTheme();
    const color = strokeColor || theme?.primary;

    const padding = 30;
    const plotWidth = width - 2 * padding;
    const labelOffset = 20; // Vertical spacing for labels

    // Scaling function to map values to SVG width
    const scaleX = (value: number) =>
        padding + ((value - min) / (max - min)) * plotWidth;

    return (
        <svg width={width} height={height} style={{ overflow: "visible" }}>
            {/* Whiskers */}
            <line
                x1={scaleX(lowerWhisker)}
                x2={scaleX(lowerQuartile)}
                y1={height / 2}
                y2={height / 2}
                stroke={color}
                strokeWidth={2}
            />
            <line
                x1={scaleX(upperQuartile)}
                x2={scaleX(upperWhisker)}
                y1={height / 2}
                y2={height / 2}
                stroke={color}
                strokeWidth={2}
            />

            {/* Whisker Caps */}
            <line
                x1={scaleX(lowerWhisker)}
                x2={scaleX(lowerWhisker)}
                y1={height / 2 - 10}
                y2={height / 2 + 10}
                stroke={color}
                strokeWidth={2}
            />
            <line
                x1={scaleX(upperWhisker)}
                x2={scaleX(upperWhisker)}
                y1={height / 2 - 10}
                y2={height / 2 + 10}
                stroke={color}
                strokeWidth={2}
            />

            {/* Box (IQR) */}
            <rect
                x={scaleX(lowerQuartile)}
                y={height / 2 - 15}
                width={scaleX(upperQuartile) - scaleX(lowerQuartile)}
                height={30}
                fill={`${color}66`}
                stroke={color}
                strokeWidth={2}
            />

            {/* Median Line */}
            <line
                x1={scaleX(median)}
                x2={scaleX(median)}
                y1={height / 2 - 15}
                y2={height / 2 + 15}
                stroke={color}
                strokeWidth={2}
            />

            {/* Labels */}
            <text x={scaleX(min)} y={height / 2 + labelOffset} fontSize="10" fill={color} textAnchor="middle">
                Min
            </text>
            {/* <text x={scaleX(lowerWhisker)} y={height / 2 + labelOffset} fontSize="10" fill={color} textAnchor="middle">
                LW
            </text> */}
            <text x={scaleX(lowerQuartile)} y={height / 2 - labelOffset} fontSize="10" fill={color} textAnchor="middle">
                Q1
            </text>
            <text x={scaleX(median)} y={height / 2 + labelOffset * 1.5} fontSize="10" fill={color} textAnchor="middle">
                Median
            </text>
            <text x={scaleX(upperQuartile)} y={height / 2 - labelOffset} fontSize="10" fill={color} textAnchor="middle">
                Q3
            </text>
            {/* <text x={scaleX(upperWhisker)} y={height / 2 + labelOffset} fontSize="10" fill={color} textAnchor="middle">
                UW
            </text> */}
            <text x={scaleX(max)} y={height / 2 + labelOffset} fontSize="10" fill={color} textAnchor="middle">
                Max
            </text>
        </svg>
    );
};

// Example usage
const exampleStats: BoxWhiskerStats = {
    min: 100,
    max: 500,
    lowerQuartile: 200,
    upperQuartile: 400,
    interquartileRange: 200,
    median: 300,
    lowerWhisker: 120,
    upperWhisker: 480,
};

export default function App() {
    return (
        <div style={{ padding: "20px" }}>
            <h3>Box-Whisker Plot</h3>
            <BoxWhiskerPlot stats={exampleStats} width={400} height={120} color="blue" />
        </div>
    );
}
