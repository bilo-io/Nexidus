import React from "react";

type HighlightedTextProps = {
    text: string;
    highlight: string;
    className?: string;
};

export const TextHighlight: React.FC<HighlightedTextProps> = ({ text, highlight, className }) => {
    if (!highlight.trim()) return <>{text}</>;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} className={className || "bg-yellow-300 px-1 rounded"}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

export default TextHighlight;
