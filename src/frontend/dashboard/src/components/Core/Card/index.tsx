import React from "react";
import { useHover } from "../../../hooks/useHover";
import { useTheme } from "../../../context/ThemeContext";

type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    shadowLevel?: ShadowLevel;
    bordered?: boolean;
    rounded?: boolean;
    className?: string;
}

const shadowStyles: Record<ShadowLevel, string> = {
    0: "shadow-none",
    1: "shadow-sm",
    2: "shadow-md",
    3: "shadow-lg",
    4: "shadow-xl",
    5: "shadow-2xl",
};

export const Card: React.FC<CardProps> = ({
    children,
    shadowLevel = 2,
    bordered = false,
    rounded = true,
    className = "bg-transaprent",
    ...props
}) => {
    const { theme } = useTheme();
    const { isHovered, onHoverStart, onHoverEnd } = useHover();

    return (
        <div
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            className={`p-4 transition-all duration-300 
            ${shadowStyles[shadowLevel]} hover:shadow-xl 
            ${bordered ? "border border-gray-300 dark:border-gray-600" : ""} 
            ${rounded ? "rounded-lg" : ""} 
            ${className}`}
            style={{
                backgroundColor: isHovered ? `${theme.panel}66` : `${theme.panel}33`
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
