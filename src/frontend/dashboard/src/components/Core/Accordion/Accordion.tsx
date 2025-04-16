import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="overflow-hidden shadow-md">
      <button
        className="w-full p-4 text-left flex items-center justify-between rounded-none"
        style={{
          backgroundColor: isHovered ? theme.primary : theme.panel,
          color: isHovered ? '#FFF' : theme.text
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{title}</span>
        <span className="transition-transform duration-300" style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}>
          ▼
        </span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 bg-white">{children}</div>
      </motion.div>
    </div>
  );
}
