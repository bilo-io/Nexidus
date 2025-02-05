import React from 'react';

interface DropdownProps {
    options: { value: string | number; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    selectClass?: string;
    optionClass?: string;
    disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
    selectClass = '',
    optionClass = '',
    disabled = false,
}) => {
    return (
        <div className={`relative w-full ${className}`}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`
          w-full px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-800 
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all
          disabled:bg-gray-200 disabled:cursor-not-allowed
          ${selectClass}
        `}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        className={`bg-white text-gray-900 hover:bg-blue-100 ${optionClass}`}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
