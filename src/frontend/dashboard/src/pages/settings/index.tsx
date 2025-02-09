import React from 'react';
import FormSettings from './FormSettings';
import { useTranslation } from 'react-i18next';
import { Text, View } from '../../components/Core'
import AppTopBar from '../../components/App/TopBar';

type SettingsProps = object

export const Settings: React.FC<SettingsProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <AppTopBar title={t('settings')} />
            <FormSettings />
        </View>
    );
};

export default Settings;