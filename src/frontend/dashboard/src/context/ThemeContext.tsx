// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes } from '../themes';

// Define a context shape
interface ThemeContextType {
    theme: typeof themes.light;
    setTheme: (theme: keyof typeof themes) => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
    children: ReactNode;
}

const getCurrentTheme = (): 'stitch' | 'dark' => {
    const currentHour = new Date().getHours();
    
    return currentHour >= 6 && currentHour < 18 ? 'stitch' : 'stitch';
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<keyof typeof themes>(getCurrentTheme());

    return (
        <ThemeContext.Provider value={{ theme: themes[theme], setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
