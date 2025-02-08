import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from '../components/Core'

type LandingProps = object

export const Dashboard: React.FC<LandingProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full h-full'>
            <Text className='text-xl font-semibold'>{t('dashboard')}</Text>
            <View className=''>
            </View>
        </View>
    );
};

export default Dashboard;