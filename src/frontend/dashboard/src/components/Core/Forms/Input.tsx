import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({ ...props }) => {
    const { theme } = useTheme();

    return (
        <input
            {...props}
            className={`border border-gray-300 rounded-lg p-0 indent-1 h-12 ${props.className}`}
            style={{ color: theme.text, background: theme.background, lineHeight: '' }}
        />
    );
};

export default Input;