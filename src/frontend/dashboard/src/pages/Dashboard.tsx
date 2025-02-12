import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from '../components/Core'
import AppTopBar from '../components/App/TopBar';

type LandingProps = object

export const Dashboard: React.FC<LandingProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={`${t('dashboard')}`} />
        </View>
    );
};

export default Dashboard;