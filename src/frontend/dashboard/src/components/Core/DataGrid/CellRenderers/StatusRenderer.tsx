import React from 'react';

// Helper function to determine the color based on status
const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case "completed":
        case "approved":
            return "green";
        case "processing":
        case "pending":
            return "orange";
        case "failed":
        case "declined":
            return "red";
        default:
            return "gray";
    }
};

interface StatusCellRendererProps {
    value: string;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
    const color = getStatusColor(value);
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: 8
                }}
            />
            <span>{value}</span>
        </div>
    );
};

export default StatusCellRenderer;
