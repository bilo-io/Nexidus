import React from "react";

interface LoaderProps {
    color?: string; // Accepts hex or Tailwind color (e.g., 'blue-500' or '#ff5733')
    size?: string;  // Tailwind width/height classes (e.g., 'w-8 h-8')
}

const Loader: React.FC<LoaderProps> = ({ color = "blue-500", size = "w-8 h-8" }) => {
    const isHex = color.startsWith("#"); // Detect if it's a hex code

    return (
        <div className={`relative ${size}`}>
            <div
                className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${isHex ? "" : `border-${color}`
                    }`}
                style={isHex ? { borderColor: `${color} transparent transparent transparent` } : {}}
            >
                <div
                    className={`absolute inset-4 rounded-full animate-pulse ${isHex ? "" : `border-${color}`
                        }`}
                    style={isHex ? {
                        backgroundColor: `${color}88`,
                    } : {}}
                />
            </div>
        </div>
    );
};

export default Loader;
