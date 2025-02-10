import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, Text, View } from '../../components/Core'
import AppTopBar from '../../components/App/TopBar';
import { useAppUrl } from '../../hooks/useAppUrl';
import LanguagePicker from '../../components/Config/LanguagePicker';
import { useTheme } from '../../context/ThemeContext';
import ThemePicker from '../../components/Config/ThemePicker';

type SettingsProps = object

export const Settings: React.FC<SettingsProps> = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [tab, setSearchParams] = useAppUrl('tab');

    const handleSetTab = (activeTab: number) => {
        const newTab = tabData?.find(
            (t: Tab & { key: string }) => t?.id === activeTab
        )?.key?.toLowerCase?.();
        // onChangeTab?.(newTab as string)
        setSearchParams({ tab: newTab as string });
    };

    const tabData: (Tab & { key: string })[] = [
        {
            id: 0,
            key: 'Language',
            label: (
                <div style={{ color: tab === 'language' ? theme?.primary : theme?.text }}>
                    {'Language'}
                </div>
            ),
            view: (
                <View className='p-4'>
                    <LanguagePicker />
                </View>
            )
        },
        {
            id: 1,
            key: 'Theme',
            label: (
                <div style={{ color: tab === 'theme' ? theme?.primary : theme?.text }}>
                    {'Theme'}
                </div>
            ),
            view: (
                <View className='flex flex-wrap'>
                    <ThemePicker />
                </View>
            )
        },
        {
            id: 2,
            key: 'Language',
            label: (
                <div style={{ color: tab === 'language' ? theme?.primary : theme?.text }}>
                    {'Language'}
                </div>
            ),
            view: (
                <View>
                    <LanguagePicker />
                </View>
            )
        },
    ]

    return (
        <View isPage className='w-full'>
            <AppTopBar title={t('settings')} />

            <View className='mt-20'>
                <Tabs
                    data={tabData}
                    defaultTabIndex={tabData?.find(
                        (t: Tab & { key: string }) => t.key?.toUpperCase() === tab?.toString().toUpperCase()
                    )?.id as number}
                    onChangeTab={handleSetTab}
                />
            </View>
        </View>
    );
};

export default Settings;