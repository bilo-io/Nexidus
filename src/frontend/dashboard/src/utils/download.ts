export function downloadCSV<T>(data: T[], filename: string = "data.csv"): void {
    if (!data.length) {
        console.warn("No data to download.");
        return;
    }

    // Extract headers from object keys
    // @ts-ignore
    const headers = Object.keys(data[0]);

    // Convert array to CSV string
    const csvRows = [
        headers.join(","), // Header row
        ...data.map(row =>
            headers
                // @ts-ignore
                .map(field => `"${String(row[field] || "").replace(/"/g, '""')}"`) // Escape quotes
                .join(",")
        )
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const getValidExtension = (ext: string) => {
    switch (ext) {
        case 'javascript':
            return 'js';
        case 'json':
            return 'json';
        case 'python':
            return 'py';
        case 'sql':
            return 'sql';
        default:
            return 'txt';
    }
}