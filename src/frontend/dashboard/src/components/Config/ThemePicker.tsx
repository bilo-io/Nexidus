import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View } from '../Core';
import { themes as themeColors } from '../../themes';


// Function to generate a preview for the theme palette
const ThemePreview: React.FC<{ theme: string }> = ({ theme }) => {


    // @ts-ignore
    const selectedTheme = themeColors[theme];

    // Render a div previewing multiple colors from the theme
    return (
        <div
            style={{
                width: '80px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                // border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: selectedTheme.panel,
                padding: '0.5rem',
            }}
        >
            <div
                style={{
                    backgroundColor: selectedTheme.primary,
                    width: '25%',
                    height: '100%',
                    borderRadius: '5px 0 0 5px',
                }}
            />
            <div
                style={{
                    backgroundColor: selectedTheme.text,
                    width: '25%',
                    height: '100%',
                }}
            />
            <div
                style={{
                    backgroundColor: selectedTheme.background,
                    width: '25%',
                    height: '100%',
                }}
            />
            <div
                style={{
                    backgroundColor: selectedTheme.panel,
                    width: '25%',
                    height: '100%',
                    borderRadius: '0 5px 5px 0',
                }}
            />
        </div>
    );
};

const themes = [
    'stitch', 'light', 'dark', 'ocean', 'custom',
    'solarized', 'cyberpunk', 'forest', 'midnight',
    'retro', 'lava', 'pastel', 'grayscale', 'aurora', 'highcontrast'
];

const ThemePicker: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <View flex flexRow flexWrap='wrap' className='w-full overflow-x-auto py-4'>
            {themes.map((item: string) => (
                <div key={item}
                    className='m-1 p-2 rounded-lg min-w-48 flex flex-row items-center gap-2'
                    // @ts-ignore
                    onClick={() => setTheme(item)}
                    style={{
                        border: `1px solid ${theme?.text}`
                    }}>
                    <ThemePreview theme={item} />
                    <div>{item.charAt(0).toUpperCase() + item.slice(1)}</div>
                </div>
            ))}
        </View>
    );
};

export default ThemePicker;
