import React from 'react';
import { View, Text, Dropdown } from '../Core';
import { ActionMeta } from 'react-select';
import { useTheme } from '../../context/ThemeContext';
import { AppBreadCrumbs } from './BreadCrumbs';

interface AppTopBarProps {
    title?: string,
    hasBreadcrumbs?: boolean,
}

export const AppTopBar: React.FC<AppTopBarProps> = ({
    title,
    hasBreadcrumbs = true,
}) => {
    const { theme } = useTheme();

    return (
        <View className='fixed w-full z-10'>
            <View className='h-16 absolute w-full flex flex-row items-center justify-between px-4 pr-20 border-b shadow-lg z-100'
                style={{
                    backgroundColor: theme.background,
                    borderColor: theme.panel
                }}>
                {hasBreadcrumbs ? (
                    <View className='pt-1 px-4'>
                        <AppBreadCrumbs />
                    </View>
                ) : (
                    <View>
                        <Text className='font-bold text-lg'>{title as string}</Text>
                    </View>
                )}
                <Dropdown
                    options={[]}
                    value={undefined}
                    onChange={function (_newValue: any, _actionMeta: ActionMeta<any>): void {
                        throw new Error('Function not implemented.');
                    }}
                />
            </View>
        </View>
    );
};

export default AppTopBar;