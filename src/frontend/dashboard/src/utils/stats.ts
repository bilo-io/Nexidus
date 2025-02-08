export type Stats = {
    min: number;
    max: number;
    avg: number;
    median: number;
    standardDeviation: number;
    sampleVariance: number;
    total: number;
    lowerQuartile?: number;
    upperQuartile?: number;
    interquartileRange?: number;
    lowerWhisker?: number;
    upperWhisker?: number;
};
export function getStats<T>(data: T[], key: keyof T): Stats {
    // Extract values from the data based on the key
    const values = data.map(item => (item[key] as unknown) as number);
    const n = values.length;

    // Sort values for median and quartile calculations
    values.sort((a, b) => a - b);

    // Helper functions for statistical operations
    const mean = values.reduce((acc, val) => acc + val, 0) / n;
    const total = values.reduce((acc, val) => acc + val, 0);

    const median = (n % 2 === 0)
        ? (values[n / 2 - 1] + values[n / 2]) / 2
        : values[Math.floor(n / 2)];

    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);

    const lowerQuartile = values[Math.floor(n / 4)];
    const upperQuartile = values[Math.floor(3 * n / 4)];
    const interquartileRange = upperQuartile - lowerQuartile;

    const lowerWhisker = values[0];
    const upperWhisker = values[n - 1];

    return {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: mean,
        median,
        standardDeviation,
        sampleVariance: variance,
        total,
        lowerQuartile,
        upperQuartile,
        interquartileRange,
        lowerWhisker,
        upperWhisker,
    };
}