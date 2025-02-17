import { useTheme } from '../../../context/ThemeContext';
import React from 'react';
import Select, { ActionMeta, StylesConfig } from 'react-select';
import { ISelectOption } from '../Forms/Select';

interface DropdownProps {
    isMulti?: boolean;
    options: ISelectOption[];
    value: any;
    onChange: (newValue: any, actionMeta: ActionMeta<any>) => void;
    style?: React.CSSProperties;
    label?: string;
    placeholder?: string;
    id?: string,
}

export const Dropdown: React.FC<DropdownProps> = ({
    isMulti = false,
    options,
    value,
    onChange,
    label,
    placeholder = 'Select...',
    id,
    ...rest
}) => {
    const { theme } = useTheme();

    // const defaultStyle: React.CSSProperties = {
    //   color: theme?.ERROR,
    //   backgroundColor: theme?.BACKGROUND,
    // };

    const customStyles: StylesConfig<any, boolean> = {
        control: (provided: any, state: { isFocused: any; }) => ({
            ...provided,
            backgroundColor: theme?.background,
            border: state.isFocused ? `1px solid ${theme?.primary}` : '1px solid #ccc',
            boxShadow: state.isFocused ? `0 0 0 1px ${theme.primary}` : 'none',
            color: theme?.text,
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: theme?.background,
            border: `1px solid ${theme?.textLight}`,
            borderRadius: '4px',
            color: theme?.text,
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            backgroundColor: state.isSelected ? theme?.successBg : state.isFocused ? theme?.primary : theme?.background,
            color: state.isFocused ? '#FFF' : theme?.text,
            cursor: 'pointer',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: `${theme?.textLight}88`,
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: theme?.text,
        }),
    };

    return (
        <div className="relative my-2">
            {label && <label
                onClick={(e) => e.stopPropagation()}
                className={`transition-all opacity-50 ${false ? 'top-0 text-xs' : 'top-5 text-xs'
                    }`}
            >
                {label}
            </label>}

            <Select
                id={id || label}
                options={options}
                value={value}
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                onChange={onChange}
                styles={customStyles}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};

export default Dropdown;
