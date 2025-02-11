import React, { useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "../../../context/ThemeContext";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right" | "top" | "bottom" | "center" | "full";
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, position = "center" }) => {
    const { theme } = useTheme();
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className={clsx(
                "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={onClose}
        >
            <div
                className={clsx(
                    "shadow-xl rounded-lg overflow-hidden transition-transform duration-300",
                    "w-full max-w-md p-6",
                    {
                        "translate-y-0": isOpen,
                        "-translate-y-full": !isOpen && position === "top",
                        "translate-y-full": !isOpen && position === "bottom",
                        "-translate-x-full": !isOpen && position === "left",
                        "translate-x-full": !isOpen && position === "right",
                    },
                    {
                        "fixed top-0 left-0 w-full h-full": position === "full",
                        "fixed top-0 left-0 h-full w-2/3 max-w-sm": position === "left",
                        "fixed top-0 right-0 h-full w-2/3 max-w-sm": position === "right",
                        "fixed top-0 w-full max-w-lg": position === "top",
                        "fixed bottom-0 w-full max-w-lg": position === "bottom",
                    }
                )}
                onClick={(e) => e.stopPropagation()}
                style={{
                    color: theme?.text,
                    backgroundColor: theme?.background,
                }}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
